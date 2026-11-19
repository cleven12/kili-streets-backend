import { Database } from 'bun:sqlite';
import { RoadRecord, TreeRecord } from '../../types/domain';

export const INITIAL_ROADS: RoadRecord[] = [
  {
    id: 'kcmc-highway',
    name: 'Barabara Kuu ya KCMC',
    surface: 'tarmac',
    orientation: 'horizontal',
    x: 0,
    y: 410,
    width: 2400,
    height: 120,
    has_center_line: 1,
  },
  {
    id: 'kcmc-gate-drive',
    name: 'Geti Kuu la KCMC',
    surface: 'tarmac',
    orientation: 'vertical',
    x: 1120,
    y: 120,
    width: 160,
    height: 300,
    has_center_line: 1,
  },
  {
    id: 'ushirika-main-road',
    name: 'Barabara ya Ushirika wa Neema',
    surface: 'murram',
    orientation: 'vertical',
    x: 1145,
    y: 525,
    width: 110,
    height: 1580,
    has_center_line: 0,
  },
  {
    id: 'ushirika-central-lane',
    name: 'Mtaa wa Mangi & Mama Ntilie',
    surface: 'murram',
    orientation: 'horizontal',
    x: 340,
    y: 1160,
    width: 1720,
    height: 92,
    has_center_line: 0,
  },
  {
    id: 'ushirika-south-lane',
    name: 'Mtaa wa Ushirika Kusini',
    surface: 'murram',
    orientation: 'horizontal',
    x: 340,
    y: 1840,
    width: 1720,
    height: 88,
    has_center_line: 0,
  },
  {
    id: 'ushirika-west-lane',
    name: 'Njia ya Shambani Magharibi',
    surface: 'murram',
    orientation: 'vertical',
    x: 340,
    y: 525,
    width: 86,
    height: 1400,
    has_center_line: 0,
  },
  {
    id: 'ushirika-east-lane',
    name: 'Njia ya Ushirika Mashariki',
    surface: 'murram',
    orientation: 'vertical',
    x: 1974,
    y: 525,
    width: 86,
    height: 1400,
    has_center_line: 0,
  },
];

export const INITIAL_TREES: TreeRecord[] = [
  { id: 'tree-01', kind: 'banana', x: 1060, y: 650, radius: 22 },
  { id: 'tree-02', kind: 'banana', x: 1060, y: 740, radius: 24 },
  { id: 'tree-03', kind: 'banana', x: 1060, y: 830, radius: 21 },
  { id: 'tree-04', kind: 'banana', x: 1330, y: 650, radius: 23 },
  { id: 'tree-05', kind: 'banana', x: 1330, y: 750, radius: 22 },
  { id: 'tree-06', kind: 'banana', x: 1330, y: 850, radius: 24 },
  { id: 'tree-07', kind: 'banana', x: 780, y: 1060, radius: 25 },
  { id: 'tree-08', kind: 'banana', x: 740, y: 1340, radius: 23 },
  { id: 'tree-09', kind: 'coffee', x: 820, y: 1370, radius: 19 },
  { id: 'tree-10', kind: 'banana', x: 1060, y: 1360, radius: 22 },
  { id: 'tree-11', kind: 'banana', x: 1060, y: 1470, radius: 24 },
  { id: 'tree-12', kind: 'banana', x: 1340, y: 1360, radius: 23 },
  { id: 'tree-13', kind: 'coffee', x: 1340, y: 1470, radius: 20 },
  { id: 'tree-14', kind: 'banana', x: 240, y: 720, radius: 25 },
  { id: 'tree-15', kind: 'banana', x: 240, y: 980, radius: 24 },
  { id: 'tree-16', kind: 'banana', x: 240, y: 1360, radius: 24 },
  { id: 'tree-17', kind: 'acacia', x: 2140, y: 720, radius: 26 },
  { id: 'tree-18', kind: 'banana', x: 2140, y: 1120, radius: 25 },
  { id: 'tree-19', kind: 'acacia', x: 2140, y: 1580, radius: 27 },
  { id: 'tree-20', kind: 'banana', x: 880, y: 2020, radius: 24 },
  { id: 'tree-21', kind: 'banana', x: 1460, y: 2010, radius: 25 },
];

export function seed003RoadsAndTrees(db: Database): void {
  const roadStmt = db.prepare(`
    INSERT OR REPLACE INTO roads (id, name, surface, orientation, x, y, width, height, has_center_line)
    VALUES ($id, $name, $surface, $orientation, $x, $y, $width, $height, $has_center_line)
  `);
  for (const r of INITIAL_ROADS) {
    roadStmt.run({
      $id: r.id,
      $name: r.name,
      $surface: r.surface,
      $orientation: r.orientation,
      $x: r.x,
      $y: r.y,
      $width: r.width,
      $height: r.height,
      $has_center_line: r.has_center_line,
    });
  }

  const treeStmt = db.prepare(`
    INSERT OR REPLACE INTO trees (id, kind, x, y, radius)
    VALUES ($id, $kind, $x, $y, $radius)
  `);
  for (const t of INITIAL_TREES) {
    treeStmt.run({
      $id: t.id,
      $kind: t.kind,
      $x: t.x,
      $y: t.y,
      $radius: t.radius,
    });
  }
}
