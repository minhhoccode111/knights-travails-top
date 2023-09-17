console.log('Hello, World!');

//

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.around = [];
    this.isVisited = false;
  }
}

class Board {
  constructor() {
    this.board = [];
    // 2 nested loops to create 2-D array represented board
    for (let i = 0; i < 8; i++) {
      this.board.push([]);
      for (let j = 0; j < 8; j++) {
        this.board[i].push(new Node(i, j));
      }
    }

    // 2 nested loops to loop through each cell on board and set that node's around neighbors
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.aroundNodes(i, j);
      }
    }
  }

  // get a i(row) and j(col) of a node and returns all neighbors node
  aroundNodes(i, j) {
    const currentNode = this.board[i][j];
    const board = [0, 1, 2, 3, 4, 5, 6, 7];
    const table = [
      [2, 1],
      [2, -1],
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2],
      [-2, 1],
      [-2, -1],
    ];
    const arrOfNeighbors = table.filter((move) => board.indexOf(move[0] + i) > -1 && board.indexOf(move[1] + j) > -1).map((legal) => [legal[0] + i, legal[1] + j]);
    for (const neighbor of arrOfNeighbors) {
      const [row, col] = neighbor;
      const neighborNode = this.board[row][col];
      currentNode.around.push(neighborNode);
    }
  }

  // takes an array e.g.[2,2] as a position and returns node at the position
  selectNode(arr) {
    const [i, j] = arr;
    return this.board[i][j];
  }
}

// start = [0,0], end = [7,7]
const knightMoves = (start, end) => {
  const board = new Board();
  const startNode = board.selectNode(start);
  const endNode = board.selectNode(end);
  const road = [];
  const queue = [startNode];
  let index = 0;

  while (queue.length > 0) {
    // get current node in queue
    const current = queue[index];
    // increase index
    index++;
    // return if current is endNode
    if (current === endNode) return 'Found';
    // mark current as visited
    current.isVisited = true;
    // loop through all its neighbors
    for (const neighbor of current.around) {
      // if neighbor has not visited yet
      if (!neighbor.isVisited) {
        queue.push(neighbor);
        console.log(queue);
      }
    }
  }

  return 'Not found';
};

knightMoves([0, 0], [7, 7]);