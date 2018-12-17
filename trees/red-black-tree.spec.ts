import {RedBlackTree} from "./red-black-tree";
import {expect} from 'chai';

describe("Calculator", () => {
    describe("Add", () => {
        it("Should return 3 when a = 1 and b = 2", () => {
            const RB = new RedBlackTree();
            RB.add(8)
                .add(4)
                .add(12)
                .add(6)
                .add(14)
                .add(5)
                .add(7);
            RB.add(3.5);
            expect(RB.root.left.right.color).equals("red");
        });
        it("5431", () => {
            const RB = new RedBlackTree();
            RB.add(11)
                .add(2)
                .add(14)
                .add(1)
                .add(7)
                .add(15)
                .add(5)
                .add(8)
            RB.add(4);
            expect(RB.root.color).equals("black");
        });
        it("54131", () => {
            const RB = new RedBlackTree();
            RB.add(11)
                .add(2)
                .add(14)
            expect(RB.root.right.color).equals("red");
            expect(RB.root.left.value).equals(2);
        });
    })
});
