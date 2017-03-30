package Puzzle;

/**
 * Created by noski on 17/3/30.
 * TODO: 判断无解
 */
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.PriorityQueue;
import java.util.Comparator;

public class Solver {
    int [][] startStatus = new int[4][4];
    int [][] targetStatus = new int[4][4];
    NodeComparator cmp = new NodeComparator();
    PriorityQueue<Node> open = new PriorityQueue<Node> (1000000, cmp);
    PriorityQueue<Node> close = new PriorityQueue<Node> (1000000, cmp);

    public Solver(int[][] startStatus, int[][] targetStatus) {
        this.startStatus = new int[4][4];
        this.targetStatus = new int[4][4];
        for (int i = 0; i < targetStatus.length; ++i) {
            for (int j = 0; j < targetStatus[i].length; ++j) {
                this.startStatus[i][j] = startStatus[i][j];
                this.targetStatus[i][j] = targetStatus[i][j];
            }
        }
    }

    private void initStart() {
        Node startNode = new Node(startStatus);
        startNode.gval = 0;
        startNode.parent = null;
        startNode.hval = startNode.getH(targetStatus);
        startNode.fval = startNode.hval;
        open.add(startNode);
    }

    private boolean isInList(Node lNode, Node newNodeParent) {
        while (newNodeParent != null) {
            if (lNode.equal(newNodeParent.status)) {
                return true;
            }
            newNodeParent = newNodeParent.parent;
        }
        return false;
    }

    private void initChild(Node newNode, List<Node> newNodeChild) {
        int empty = newNode.getEmpty();

        // 右移
        if ((empty % 4) != 0) {
            Node lNode = new Node(newNode.status);
            lNode.status[empty / 4][empty % 4] = lNode.status[empty / 4][empty % 4 - 1];
            lNode.status[empty / 4][empty % 4 - 1] = 0;
            if (isInList(lNode, newNode.parent) == false) {
                lNode.parent = newNode;
                lNode.gval = newNode.gval + 1;
                lNode.hval = lNode.getH(targetStatus);
                lNode.fval = lNode.gval + lNode.hval;
                newNodeChild.add(lNode);
            }
        }

        // 上移
        if ((empty / 4) != 3) {
            Node lNode = new Node(newNode.status);
            lNode.status[empty / 4][empty % 4] = lNode.status[empty / 4 + 1][empty % 4];
            lNode.status[empty / 4 + 1][empty % 4] = 0;
            if (isInList(lNode, newNode.parent) == false) {
                lNode.parent = newNode;
                lNode.gval = newNode.gval + 1;
                lNode.hval = lNode.getH(targetStatus);
                lNode.fval = lNode.gval + lNode.hval;
                newNodeChild.add(lNode);
            }
        }

        // 左移
        if ((empty % 4) != 3) {
            Node lNode = new Node(newNode.status);
            lNode.status[empty / 4][empty % 4] = lNode.status[empty / 4][empty % 4 + 1];
            lNode.status[empty / 4][empty % 4 + 1] = 0;
            if (isInList(lNode, newNode.parent) == false) {
                lNode.parent = newNode;
                lNode.gval = newNode.gval + 1;
                lNode.hval = lNode.getH(targetStatus);
                lNode.fval = lNode.gval + lNode.hval;
                newNodeChild.add(lNode);
            }
        }

        // 下移
        if ((empty / 4) != 0) {
            Node lNode = new Node(newNode.status);
            lNode.status[empty / 4 - 1][empty % 4] = lNode.status[empty / 4 - 1][empty % 4];
            lNode.status[empty / 4 - 1][empty % 4] = 0;
            if (isInList(lNode, newNode.parent) == false) {
                lNode.parent = newNode;
                lNode.gval = newNode.gval + 1;
                lNode.hval = lNode.getH(targetStatus);
                lNode.fval = lNode.gval + lNode.hval;
                newNodeChild.add(lNode);
            }
        }
    }

    public boolean isInOpenOrClose(Node newNode, PriorityQueue<Node> list) {
        Iterator<Node> iter = list.iterator();
        while (iter.hasNext()) {
            Node iterNode = iter.next();
            if (iterNode.equal(newNode.status)) {
                return true;
            }
        }
        return false;
    }

    private int getReverse(int [][] status) {
        int reverse = 0;
        for(int i = 0; i < 16; ++i) {
            if (status[i / 4][i % 4] == 0) {
                reverse += (15 - i);
            }
            for(int j = i + 1; j < 16; ++j) {
                if(status[i / 4][i % 4] > status[j / 4][j % 4] && i / 4 == j / 4) {
                    reverse += 1;
                }
            }
        }
        return reverse;
    }

    private boolean check(int [][] startStatus, int [][] targetStatus) {
        int startReverse = getReverse(startStatus);
        int targetReverse = getReverse(targetStatus);
        if (startReverse % 2 != targetReverse % 2) {
            return false;
        }
        return true;
    }

    public void run() {
        if (check(startStatus, targetStatus) == false) {
            System.out.println("无解");
            return;
        }
        initStart();
        while (open.isEmpty() == false) {
            Node newNode = open.poll();
            close.add(newNode);
            if (newNode.equal(targetStatus)) {
                int i = 0;
                while(newNode != null) {
                    for(int j = 0; j < 16; ++j) {
                        System.out.print(newNode.status[j / 4][j % 4]);
                        System.out.print("  ");
                        if(j % 4 == 3) {
                            System.out.println();
                        }
                    }

                    System.out.println("第" + i + "步 status fvalue: " + newNode.fval);
                    newNode = newNode.parent;
                    i += 1;
                }
                return;
            }

            List<Node> newNodeChild = new ArrayList<Node>();
            initChild(newNode, newNodeChild);
            for (Node iter : newNodeChild) {
                if (isInOpenOrClose(iter, open) == true) {
                    Iterator<Node> iterNew = open.iterator();
                    while (iterNew.hasNext()) {
                        Node iterNode = iterNew.next();
                        if (iterNode.equal(iter.status) && iter.gval < iterNode.gval) {
                            iterNode.parent = iter.parent;
                            iterNode.gval = iter.gval;
                            iterNode.fval = iter.fval;
                        }
                    }
                } else if (isInOpenOrClose(iter, close) == true) {
                    Iterator<Node> iterNew = close.iterator();
                    while (iterNew.hasNext()) {
                        Node iterNode = iterNew.next();
                        if (iterNode.equal(iter.status) && iter.gval < iterNode.gval) {
                            iterNode.parent = iter.parent;
                            iterNode.gval = iter.gval;
                            iterNode.fval = iter.fval;
                            close.remove(iterNode);
                            open.add(iter);
                        }
                    }
                } else {
                    open.add(iter);
                }
            }
        }
        System.out.println("无解");
    }

    class NodeComparator implements Comparator<Node> {
        @Override
        public int compare(Node x, Node y) {
            return x.fval - y.fval;
        }
    }
}
