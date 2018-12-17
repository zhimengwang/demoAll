import {AVLTree} from "./AVLTree";
import {expect} from 'chai';

describe("Calculator", () => {
    describe("Add", () => {
        it("Should return 3 when a = 1 and b = 2", () => {
            const At = new AVLTree();
            At.add(3)
                .add(1)
                .add(8)
                .add(2)
                .add(7)
                .add(9)
                .add(6)
                .remove(8)
            expect(At.root.value).equals(3);
            expect(At.root.right.value).equals(7);
        });
        it("RR", () => {
            const At = new AVLTree();
            At.add(4)
                .add(2)
                .add(6)
                .add(3)
                .add(1)
                .remove(6);
            expect(At.root.right.value).equals(4);
        });
        it("LL", () => {
            const At = new AVLTree();
            At.add(4)
                .add(2)
                .add(6)
                .add(5)
                .add(7)
                .remove(2);
            expect(At.root.right.value).equals(7);
            expect(At.root.left.value).equals(4);
            expect(At.root.left.right.value).equals(5);
            expect(At.root.left.left).equals(undefined);
        });
        it("DELETE root", () => {
            const At = new AVLTree();
            At.add(2)
                .add(1)
                .add(3)
                .remove(2);
            expect(At.root.left.value).equals(1);
        });
        it("add RR", () => {
            const At = new AVLTree();
            At.add(1)
                .add(2)
                .add(3)
            expect(At.root.value).equals(2);
            expect(At.root.left.value).equals(1);
        });
        it("RL", () => {
            const At = new AVLTree();
            At.add(1)
                .add(3)
                .add(2)
            expect(At.root.value).equals(2);
            expect(At.root.left.value).equals(1);
            expect(At.root.right.value).equals(3);
        });
        it("RL base", () => {
            const At = new AVLTree();
            At.add(3)
                .add(2)
                .add(7)
                .add(1)
                .add(5)
                .add(8)
                .add(4)
                .add(6)
                .remove(1)
            expect(At.root.value).equals(5);
            expect(At.root.right.value).equals(7);
            expect(At.root.left.left.value).equals(2);
            expect(At.root.right.right.value).equals(8);
            expect(At.root.left.value).equals(3);
        });
        it("LR", () => {
            const At = new AVLTree();
            At.add(6)
                .add(2)
                .add(7)
                .add(1)
                .add(4)
                .add(8)
                .add(3)
                .add(5)
                .remove(8)
            expect(At.root.value).equals(4);
            expect(At.root.right.value).equals(6);
            expect(At.root.left.left.value).equals(1);
            expect(At.root.right.right.value).equals(7);
            expect(At.root.left.value).equals(2);
        });
    })
});