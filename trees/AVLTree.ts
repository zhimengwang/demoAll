import {BSTree} from "./BSTree";
import {TreeNode} from "./tree-node";
import {ChDirection} from "./tree-node";

export class AVLTree extends BSTree {
    add(value): AVLTree {
        super.add(value);
        const node = super.find(value);
        this.balanceUpTree(node);
        return this
    }

    remove(value: number): TreeNode {
        const node = super.find(value);
        if (node) {
            const newNode = super.remove(value);
            this.balanceUpTree(newNode || node.parent);
        }
        return null
    }

    balanceUpTree(node: TreeNode) {
        let currentNode = node;
        while (currentNode) {
            this.balance(currentNode);
            currentNode = currentNode.parent
        }
    }

    balance(node: TreeNode) {
        if (node.balanceFactor > 1) {
            //LL
            if (node.left.balanceFactor >= 0) {
                this.rightRotation(node)
            } else if (node.left.balanceFactor<0) {
                this.leftRightRotation(node);
            }
        } else if (node.balanceFactor < -1) {
            if (node.right.balanceFactor <= 0) {
                this.leftRotation(node)
            } else if (node.right.balanceFactor > 0) {
                this.rightLeftRotation(node);
            }
        }
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
}

