package Puzzle;

/**
 * Created by noski on 17/3/30.
 */
public class Node {
    Node parent;
    int fval;
    int gval;
    int hval;
    public int [][] status = new int[4][4];

    public Node(int [][] status) {
        for (int i = 0; i < status.length; ++i) {
            for (int j = 0; j < status[i].length; ++j) {
                this.status[i][j] = status[i][j];
            }
        }
    }

    public void setG(int gval) {
        this.gval = gval;
    }

    public int getEmpty() {
        int k = 0;
        for (int i=  0; i < 16; ++i) {
            if (status[i / 4][i % 4] == 0) {
                k = i;
                return k;
            }
        }
        return k;
    }

    public boolean equal(int [][] targetStatus) {
        for (int i = 0; i < targetStatus.length; ++i) {
            for (int j = 0; j < targetStatus[i].length; ++j) {
                if (status[i][j] != targetStatus[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    public int getH(int [][] targetStatus) {
        int k = 0;
        for (int i = 0; i < targetStatus.length; ++i) {
            for (int j = 0; j < targetStatus[i].length; ++j) {
                if (status[i][j] != targetStatus[i][j]) {
                    k += 1;
                }
            }
        }
        return k;
    }
}
