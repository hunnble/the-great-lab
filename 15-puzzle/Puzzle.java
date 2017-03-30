package Puzzle;

/**
 * Created by noski on 17/3/30.
 */
public class Puzzle {
    public static void main(String args[]) {
        int [][] startStatus1 = {
                { 4, 3, 11, 10 },
                { 1, 2, 6, 0 },
                { 8, 12, 5, 9 },
                { 7, 13, 14, 15 }
        };
        int [][] startStatus2 = {
                { 1, 2, 3, 4 },
                { 5, 6, 7, 8 },
                { 9, 10, 0, 12 },
                { 13, 14, 11, 15 }
        };
        int [][] startStatus3 = {
                { 1, 0, 2, 4 },
                { 5, 6, 3, 8 },
                { 9, 10, 7, 12 },
                { 13, 14, 11, 15 }
        };
        int [][] targetStatus = {
                { 1, 2, 3, 4 },
                { 5, 6, 7, 8 },
                { 9, 10, 11, 12 },
                { 13, 14, 15, 0 }
        };
        Solver hero = new Solver(startStatus3, targetStatus);
        hero.run();
    }
}
