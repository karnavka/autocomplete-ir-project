import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.TreeSet;

public class TrieAutoCompRank {

    private class Node {
        Map<Character, Node> children;
        char c;
        int wordCount;

        public Node(char c) {
            this.c = c;
            children = new HashMap<>();
            wordCount = 0;
        }

        public Node() {
            children = new HashMap<>();
        }

        public void insert(String word) {
            if (word == null || word.isEmpty())
                return;
            char firstChar = word.charAt(0);
            Node child = children.get(firstChar);
            if (child == null) {
                child = new Node(firstChar);
                children.put(firstChar, child);
            }
            if (word.length() > 1)
                child.insert(word.substring(1));
            else
                child.wordCount++;
        }
    }

    public class Query implements Comparable<Query> {
        String queue;
        int count;

        public Query(String queue, int count) {
            this.queue = queue;
            this.count = count;
        }

        @Override
        public int compareTo(TrieAutoCompRank.Query o) {
            if (count == o.count)
                return queue.compareTo(o.queue);
            return Integer.compare(o.count, count);
        }

        public String getQueue() {
            return queue;
        }

        @Override
        public String toString() {
            return queue;
        }

    }

    Node root;

    public TrieAutoCompRank(List<String> words) {
        root = new Node();
        for (String word : words)
            root.insert(word);
    }

    public boolean find(String prefix) {
        Node lastNode = root;
        for (char c : prefix.toCharArray()) {
            lastNode = lastNode.children.get(c);
            if (lastNode == null)
                return false;
        }
        return lastNode.wordCount > 0;
    }

    public void suggest(Node root, TreeSet<Query> list, StringBuilder curr, int k) {
        if (root.wordCount > 0)
            list.add(new Query(curr.toString(), root.wordCount));
        if (root.children == null || root.children.isEmpty())
            return;
        for (Node child : root.children.values()) {
            suggest(child, list, curr.append(child.c), k);
            curr.setLength(curr.length() - 1);
        }
    }

    public TreeSet<Query> suggest(String prefix, int k) {
        TreeSet<Query> list = new TreeSet<>();
        Node lastNode = root;
        StringBuilder curr = new StringBuilder();
        for (char c : prefix.toCharArray()) {
            lastNode = lastNode.children.get(c);
            if (lastNode == null)
                return list;
            curr.append(c);
        }
        suggest(lastNode, list, curr, k);
        TreeSet<Query> result = new TreeSet<>();
        int i = 0;
        for (Query q : list) {
            if (i++ == k)
                break;
            result.add(q);
        }
        return result;
    }

    public static void main(String[] args) {
        List<String> words = List.of("app", "app", "app", "apricot", "apricot", "apple", "car", "cat", "case");
        TrieAutoCompRank trie = new TrieAutoCompRank(words);

        System.out.println(trie.suggest("ap", 2));
    }

}