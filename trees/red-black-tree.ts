import {BSTree} from "./BSTree";
import {RED_BLACK_TREE_COLORS, RedBlackTreeNode} from "./RedBlackNode";
import {TreeNode} from "./tree-node";


const COLOR_PROP_NAME = 'color';


export class RedBlackTree extends BSTree {
    root: RedBlackTreeNode;
    parent: RedBlackTreeNode;

    add(value: number): RedBlackTree {
        const node = new RedBlackTreeNode(value);
        if (this.root) {
            const {found, parent} = this.findNodeAndParent(node.value);
            if (found) { // duplicated: value already exist on the tree
                found.meta.multiplicity = (found.meta.multiplicity || 1) + 1;
            } else if (value < parent.value) {
                parent.left = node;
            } else {
                parent.right = node;
            }
        } else {
            this.root = node;
        }
        this.size += 1;


        if (node.parent && node.parent === this.root) {
            RedBlackTree.makeNodeBlack(node);

        } else {
            RedBlackTree.makeNodeRed(node);
        }
        this.balance(node);

        return this;
    }

    findNodeAndParent(value: number) {
        let node = this.root;
        let parent: RedBlackTreeNode;
        while (node) {
            if (node.value === value) {
                break;
            }
            parent = node;
            node = value > node.value ? node.right : node.left
        }
        return {found: node, parent}
    }


    static makeNodeRed(node: TreeNode) {
        node.meta.color = RED_BLACK_TREE_COLORS.red;
        return node;
    }

    static makeNodeBlack(node: TreeNode) {
        node.meta.color = RED_BLACK_TREE_COLORS.black;
        return node;
    }

    static isNodeRed(node) {
        return node.meta.color === RED_BLACK_TREE_COLORS.red;
    }


    isNodeBlack(node) {
        return node.meta.color === RED_BLACK_TREE_COLORS.black;
    }

    isRoot(node) {
        return node === this.root
    }

    balance(node: RedBlackTreeNode) {
        if (node.parent && node.parent.color === RED_BLACK_TREE_COLORS.red) {
            if (!this.isRoot(node) || (RedBlackTree.isNodeRed(node.parent))) {
                if (node.uncle) {
                    if (node.uncle.color === RED_BLACK_TREE_COLORS.red && node.grandParent) {
                        node.uncle.color = RED_BLACK_TREE_COLORS.black;
                        console.log(node.uncle.value);
                        node.parent.color = RED_BLACK_TREE_COLORS.black;
                        node.grandParent.color = RED_BLACK_TREE_COLORS.red;
                        this.balance(node.grandParent)
                    } else if (node.uncle.color === RED_BLACK_TREE_COLORS.black) {
                        if (node.parentChildSide === "right") {
                            const oldParent = node.parent;
                            this.leftRotation(node.parent);
                            this.balance(oldParent)
                        } else if (node.parentChildSide === "left") {
                            node.parent.color = RED_BLACK_TREE_COLORS.black;
                            node.grandParent.color = RED_BLACK_TREE_COLORS.red;
                            this.rightRotation(node.grandParent)
                        }
                    }
                }
            }
        }
        this.root.color = RED_BLACK_TREE_COLORS.black

    }

    rightRotation(oldNode: TreeNode) {
        const newNode = oldNode.left;
        const grandNode = oldNode.parent;
        oldNode.parent = newNode;
        oldNode.left = newNode.right;

        newNode.parent = grandNode;
        if (grandNode) {
            const side = oldNode.isParentLeftChild ? 'left' : 'right';
            grandNode[side] = newNode
        } else {
            super.root = newNode
        }
        newNode.right = oldNode;
    }

    leftRotation(oldNode) {
        const newNode = oldNode.right;
        const grandNode = oldNode.parent;
        oldNode.parent = newNode;
        oldNode.right = newNode.left;

        newNode.parent = grandNode;
        if (grandNode) {
            const side = oldNode.isParentLeftChild ? 'left' : 'right';
            grandNode[side] = newNode
        } else {
            super.root = newNode
        }
        newNode.left = oldNode;
    }

    leftRightRotation(node: TreeNode) {
        this.leftRotation(node.left);
        this.rightRotation(node);
    }

    rightLeftRotation(node: TreeNode) {
        this.rightRotation(node.right);
        this.leftRotation(node);
    }

    leftLeftRotation() {

    }

    rightRightRotation() {

    }

}
