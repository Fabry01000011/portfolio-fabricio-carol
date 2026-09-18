/**
 * Layout engine for the architecture diagrams.
 *
 * Nodes and edges come from the project data; positions are computed here so a
 * project never has to hand-place a box. Nodes are assigned to layers by longest
 * path from a source, which keeps the flow readable (client → API → data) without
 * anyone specifying coordinates.
 */

export interface DiagramNode {
  id: string;
  label: string;
  kind: 'client' | 'frontend' | 'api' | 'service' | 'worker' | 'database' | 'external' | 'storage';
  description?: string;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
}

export interface PositionedNode extends DiagramNode {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PositionedEdge {
  from: string;
  to: string;
  label?: string;
  path: string;
  /** True when the edge flows against the main direction (e.g. a webhook back to the API). */
  reverse: boolean;
}

export interface DiagramLayout {
  nodes: PositionedNode[];
  edges: PositionedEdge[];
  width: number;
  height: number;
}

const NODE_W = 162;
const NODE_H = 68;
const GAP_X = 48;
const GAP_Y = 22;
const PADDING = 10;

/**
 * Assigns each node a layer index. Uses the longest path from any node with no
 * incoming edge, with a visit cap so a cycle (webhooks, callbacks) cannot hang
 * the build.
 */
function assignLayers(nodes: DiagramNode[], edges: DiagramEdge[]): Map<string, number> {
  const ids = new Set(nodes.map((n) => n.id));
  const valid = edges.filter((e) => ids.has(e.from) && ids.has(e.to));

  const incoming = new Map<string, number>();
  const outgoing = new Map<string, string[]>();
  for (const node of nodes) {
    incoming.set(node.id, 0);
    outgoing.set(node.id, []);
  }
  for (const edge of valid) {
    incoming.set(edge.to, (incoming.get(edge.to) ?? 0) + 1);
    outgoing.get(edge.from)!.push(edge.to);
  }

  const layer = new Map<string, number>();
  for (const node of nodes) layer.set(node.id, 0);

  // Sources: nodes nothing points at. If every node has an incoming edge (a full
  // cycle), fall back to the first node so the diagram still renders.
  let queue = nodes.filter((n) => (incoming.get(n.id) ?? 0) === 0).map((n) => n.id);
  if (queue.length === 0 && nodes.length > 0) queue = [nodes[0]!.id];

  const maxIterations = nodes.length * Math.max(valid.length, 1) + nodes.length;
  let iterations = 0;

  while (queue.length > 0 && iterations < maxIterations) {
    const current = queue.shift()!;
    iterations += 1;
    const currentLayer = layer.get(current) ?? 0;
    for (const next of outgoing.get(current) ?? []) {
      if ((layer.get(next) ?? 0) < currentLayer + 1) {
        layer.set(next, currentLayer + 1);
        queue.push(next);
      }
    }
  }

  return layer;
}

/** Rounded orthogonal connector between two boxes. */
function connector(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  direction: 'horizontal' | 'vertical',
): string {
  if (direction === 'horizontal') {
    const mid = x1 + (x2 - x1) / 2;
    if (Math.abs(y1 - y2) < 2) return `M ${x1} ${y1} L ${x2} ${y2}`;
    const r = Math.min(10, Math.abs(y2 - y1) / 2, Math.abs(mid - x1));
    const sweepDown = y2 > y1;
    return [
      `M ${x1} ${y1}`,
      `L ${mid - r} ${y1}`,
      `Q ${mid} ${y1} ${mid} ${y1 + (sweepDown ? r : -r)}`,
      `L ${mid} ${y2 - (sweepDown ? r : -r)}`,
      `Q ${mid} ${y2} ${mid + r} ${y2}`,
      `L ${x2} ${y2}`,
    ].join(' ');
  }

  const mid = y1 + (y2 - y1) / 2;
  if (Math.abs(x1 - x2) < 2) return `M ${x1} ${y1} L ${x2} ${y2}`;
  const r = Math.min(10, Math.abs(x2 - x1) / 2, Math.abs(mid - y1));
  const sweepRight = x2 > x1;
  return [
    `M ${x1} ${y1}`,
    `L ${x1} ${mid - r}`,
    `Q ${x1} ${mid} ${x1 + (sweepRight ? r : -r)} ${mid}`,
    `L ${x2 - (sweepRight ? r : -r)} ${mid}`,
    `Q ${x2} ${mid} ${x2} ${mid + r}`,
    `L ${x2} ${y2}`,
  ].join(' ');
}

export function layoutDiagram(
  nodes: DiagramNode[],
  edges: DiagramEdge[],
  direction: 'horizontal' | 'vertical' = 'horizontal',
): DiagramLayout {
  if (nodes.length === 0) return { nodes: [], edges: [], width: 0, height: 0 };

  const layerOf = assignLayers(nodes, edges);
  const layers = new Map<number, DiagramNode[]>();
  for (const node of nodes) {
    const index = layerOf.get(node.id) ?? 0;
    if (!layers.has(index)) layers.set(index, []);
    layers.get(index)!.push(node);
  }

  const layerIndexes = [...layers.keys()].sort((a, b) => a - b);
  const tallest = Math.max(...[...layers.values()].map((l) => l.length));

  const positioned: PositionedNode[] = [];

  if (direction === 'horizontal') {
    const totalHeight = tallest * NODE_H + (tallest - 1) * GAP_Y;
    layerIndexes.forEach((layerIndex, column) => {
      const group = layers.get(layerIndex)!;
      const groupHeight = group.length * NODE_H + (group.length - 1) * GAP_Y;
      const offsetY = PADDING + (totalHeight - groupHeight) / 2;
      group.forEach((node, row) => {
        positioned.push({
          ...node,
          x: PADDING + column * (NODE_W + GAP_X),
          y: offsetY + row * (NODE_H + GAP_Y),
          width: NODE_W,
          height: NODE_H,
        });
      });
    });
  } else {
    const totalWidth = tallest * NODE_W + (tallest - 1) * GAP_Y;
    layerIndexes.forEach((layerIndex, row) => {
      const group = layers.get(layerIndex)!;
      const groupWidth = group.length * NODE_W + (group.length - 1) * GAP_Y;
      const offsetX = PADDING + (totalWidth - groupWidth) / 2;
      group.forEach((node, column) => {
        positioned.push({
          ...node,
          x: offsetX + column * (NODE_W + GAP_Y),
          y: PADDING + row * (NODE_H + GAP_X),
          width: NODE_W,
          height: NODE_H,
        });
      });
    });
  }

  const byId = new Map(positioned.map((n) => [n.id, n]));

  const positionedEdges: PositionedEdge[] = [];
  for (const edge of edges) {
    const from = byId.get(edge.from);
    const to = byId.get(edge.to);
    if (!from || !to) continue;

    const forward =
      direction === 'horizontal' ? to.x >= from.x + from.width : to.y >= from.y + from.height;

    let x1: number, y1: number, x2: number, y2: number;
    if (direction === 'horizontal') {
      x1 = forward ? from.x + from.width : from.x;
      y1 = from.y + from.height / 2;
      x2 = forward ? to.x : to.x + to.width;
      y2 = to.y + to.height / 2;
    } else {
      x1 = from.x + from.width / 2;
      y1 = forward ? from.y + from.height : from.y;
      x2 = to.x + to.width / 2;
      y2 = forward ? to.y : to.y + to.height;
    }

    positionedEdges.push({
      from: edge.from,
      to: edge.to,
      label: edge.label,
      path: connector(x1, y1, x2, y2, direction),
      reverse: !forward,
    });
  }

  const width = Math.max(...positioned.map((n) => n.x + n.width)) + PADDING;
  const height = Math.max(...positioned.map((n) => n.y + n.height)) + PADDING;

  return { nodes: positioned, edges: positionedEdges, width, height };
}

/** Node colours by role. Same palette language as the technology chips. */
export const nodeStyles: Record<DiagramNode['kind'], { accent: string; label: string }> = {
  client: { accent: '#64748b', label: 'Cliente' },
  frontend: { accent: '#ea580c', label: 'Frontend' },
  api: { accent: '#2f55ff', label: 'API' },
  service: { accent: '#7c3aed', label: 'Servicio' },
  worker: { accent: '#7c3aed', label: 'Worker' },
  database: { accent: '#0d9488', label: 'Datos' },
  storage: { accent: '#0d9488', label: 'Archivos' },
  external: { accent: '#b45309', label: 'Externo' },
};

/**
 * Groups nodes into ordered layers without computing coordinates.
 *
 * Used for the phone rendering, which lays the architecture out as plain HTML
 * instead of an SVG: a scaled-down SVG puts 60px-wide boxes on a phone, and an
 * unreadable diagram is worse than no diagram.
 */
export function groupIntoLayers(nodes: DiagramNode[], edges: DiagramEdge[]): DiagramNode[][] {
  if (nodes.length === 0) return [];
  const layerOf = assignLayers(nodes, edges);
  const layers = new Map<number, DiagramNode[]>();
  for (const node of nodes) {
    const index = layerOf.get(node.id) ?? 0;
    if (!layers.has(index)) layers.set(index, []);
    layers.get(index)!.push(node);
  }
  return [...layers.keys()].sort((a, b) => a - b).map((key) => layers.get(key)!);
}
