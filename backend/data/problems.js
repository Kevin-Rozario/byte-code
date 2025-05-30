export const leetcodeProblems = [
  {
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    difficulty: "EASY",
    tags: ["array", "hash-table"],
    examples: {
      python: {
        input: "[2,7,11,15] 9",
        output: "[0,1]",
        explanation: "nums[0] + nums[1] = 2 + 7 = 9, so we return [0, 1].",
      },
      javascript: {
        input: "[3,2,4] 6",
        output: "[1,2]",
        explanation: "nums[1] + nums[2] = 2 + 4 = 6, so we return [1, 2].",
      },
    },
    constraints:
      "2 ≤ nums.length ≤ 10^4, -10^9 ≤ nums[i] ≤ 10^9, -10^9 ≤ target ≤ 10^9",
    testCases: [
      { input: "[2,7,11,15] 9", output: "[0,1]" },
      { input: "[3,2,4] 6", output: "[1,2]" },
      { input: "[3,3] 6", output: "[0,1]" },
    ],
    codeSnippets: {
      javascript:
        "const fs = require('fs');\n\nfunction twoSum(nums, target) {\n    // Write your code here\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst parts = input.split(' ');\nconst nums = JSON.parse(parts[0]);\nconst target = parseInt(parts[1]);\nconsole.log(JSON.stringify(twoSum(nums, target)));",
      python:
        "def two_sum(nums, target):\n    # Write your code here\n    num_map = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in num_map:\n            return [num_map[complement], i]\n        num_map[num] = i\n    return []\n\nimport sys\nimport json\ninput_line = sys.stdin.read().strip()\nparts = input_line.split(' ', 1)\nnums = json.loads(parts[0])\ntarget = int(parts[1])\nprint(json.dumps(two_sum(nums, target)))",
      java: 'import java.util.*;\n\npublic class Main {\n    public static int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[]{map.get(complement), i};\n            }\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String input = sc.nextLine();\n        String[] parts = input.split(" ", 2);\n        String numsStr = parts[0].substring(1, parts[0].length()-1);\n        int[] nums = Arrays.stream(numsStr.split(",")).mapToInt(Integer::parseInt).toArray();\n        int target = Integer.parseInt(parts[1]);\n        System.out.println(Arrays.toString(twoSum(nums, target)));\n    }\n}',
    },
    referenceSolutions: {
      javascript:
        "const fs = require('fs');\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst parts = input.split(' ');\nconst nums = JSON.parse(parts[0]);\nconst target = parseInt(parts[1]);\n\nconst map = new Map();\nfor (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n        console.log(JSON.stringify([map.get(complement), i]));\n        break;\n    }\n    map.set(nums[i], i);\n}",
      python:
        "import sys\nimport json\ninput_line = sys.stdin.read().strip()\nparts = input_line.split(' ', 1)\nnums = json.loads(parts[0])\ntarget = int(parts[1])\n\nnum_map = {}\nfor i, num in enumerate(nums):\n    complement = target - num\n    if complement in num_map:\n        print(json.dumps([num_map[complement], i]))\n        break\n    num_map[num] = i",
      java: 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String input = sc.nextLine();\n        String[] parts = input.split(" ", 2);\n        String numsStr = parts[0].substring(1, parts[0].length()-1);\n        int[] nums = Arrays.stream(numsStr.split(",")).mapToInt(Integer::parseInt).toArray();\n        int target = Integer.parseInt(parts[1]);\n        \n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                System.out.println(Arrays.toString(new int[]{map.get(complement), i}));\n                break;\n            }\n            map.put(nums[i], i);\n        }\n    }\n}',
    },
  },
  {
    title: "Reverse Integer",
    description:
      "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.",
    difficulty: "MEDIUM",
    tags: ["math"],
    examples: {
      python: {
        input: "123",
        output: "321",
        explanation: "The reverse of 123 is 321.",
      },
      javascript: {
        input: "-123",
        output: "-321",
        explanation: "The reverse of -123 is -321.",
      },
    },
    constraints: "-2^31 ≤ x ≤ 2^31 - 1",
    testCases: [
      { input: "123", output: "321" },
      { input: "-123", output: "-321" },
      { input: "120", output: "21" },
    ],
    codeSnippets: {
      javascript:
        "const fs = require('fs');\n\nfunction reverse(x) {\n    // Write your code here\n    const sign = x < 0 ? -1 : 1;\n    const reversed = parseInt(Math.abs(x).toString().split('').reverse().join(''));\n    if (reversed > 2**31 - 1) return 0;\n    return sign * reversed;\n}\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst x = parseInt(input);\nconsole.log(reverse(x));",
      python:
        "def reverse(x):\n    # Write your code here\n    sign = -1 if x < 0 else 1\n    reversed_num = int(str(abs(x))[::-1])\n    if reversed_num > 2**31 - 1:\n        return 0\n    return sign * reversed_num\n\nimport sys\ninput_line = sys.stdin.read().strip()\nx = int(input_line)\nprint(reverse(x))",
      java: "import java.util.Scanner;\n\npublic class Main {\n    public static int reverse(int x) {\n        // Write your code here\n        int result = 0;\n        while (x != 0) {\n            int pop = x % 10;\n            x /= 10;\n            if (result > Integer.MAX_VALUE/10 || (result == Integer.MAX_VALUE / 10 && pop > 7)) return 0;\n            if (result < Integer.MIN_VALUE/10 || (result == Integer.MIN_VALUE / 10 && pop < -8)) return 0;\n            result = result * 10 + pop;\n        }\n        return result;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int x = sc.nextInt();\n        System.out.println(reverse(x));\n    }\n}",
    },
    referenceSolutions: {
      javascript:
        "const fs = require('fs');\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst x = parseInt(input);\n\nconst sign = x < 0 ? -1 : 1;\nconst reversed = parseInt(Math.abs(x).toString().split('').reverse().join(''));\nif (reversed > 2**31 - 1) {\n    console.log(0);\n} else {\n    console.log(sign * reversed);\n}",
      python:
        "import sys\ninput_line = sys.stdin.read().strip()\nx = int(input_line)\n\nsign = -1 if x < 0 else 1\nreversed_num = int(str(abs(x))[::-1])\nif reversed_num > 2**31 - 1:\n    print(0)\nelse:\n    print(sign * reversed_num)",
      java: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int x = sc.nextInt();\n        \n        int result = 0;\n        while (x != 0) {\n            int pop = x % 10;\n            x /= 10;\n            if (result > Integer.MAX_VALUE/10 || (result == Integer.MAX_VALUE / 10 && pop > 7)) {\n                System.out.println(0);\n                return;\n            }\n            if (result < Integer.MIN_VALUE/10 || (result == Integer.MIN_VALUE / 10 && pop < -8)) {\n                System.out.println(0);\n                return;\n            }\n            result = result * 10 + pop;\n        }\n        System.out.println(result);\n    }\n}",
    },
  },
  {
    title: "Palindrome Number",
    description:
      "Given an integer x, return true if x is a palindrome, and false otherwise.",
    difficulty: "EASY",
    tags: ["math"],
    examples: {
      python: {
        input: "121",
        output: "true",
        explanation:
          "121 reads as 121 from left to right and from right to left.",
      },
      javascript: {
        input: "-121",
        output: "false",
        explanation:
          "From left to right, it reads -121. From right to left, it becomes 121-.",
      },
    },
    constraints: "-2^31 ≤ x ≤ 2^31 - 1",
    testCases: [
      { input: "121", output: "true" },
      { input: "-121", output: "false" },
      { input: "10", output: "false" },
    ],
    codeSnippets: {
      javascript:
        "const fs = require('fs');\n\nfunction isPalindrome(x) {\n    // Write your code here\n    if (x < 0) return false;\n    const str = x.toString();\n    return str === str.split('').reverse().join('');\n}\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst x = parseInt(input);\nconsole.log(isPalindrome(x));",
      python:
        "def is_palindrome(x):\n    # Write your code here\n    if x < 0:\n        return False\n    str_x = str(x)\n    return str_x == str_x[::-1]\n\nimport sys\ninput_line = sys.stdin.read().strip()\nx = int(input_line)\nprint(str(is_palindrome(x)).lower())",
      java: "import java.util.Scanner;\n\npublic class Main {\n    public static boolean isPalindrome(int x) {\n        // Write your code here\n        if (x < 0) return false;\n        String str = String.valueOf(x);\n        return str.equals(new StringBuilder(str).reverse().toString());\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int x = sc.nextInt();\n        System.out.println(isPalindrome(x));\n    }\n}",
    },
    referenceSolutions: {
      javascript:
        "const fs = require('fs');\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst x = parseInt(input);\n\nif (x < 0) {\n    console.log(false);\n} else {\n    const str = x.toString();\n    console.log(str === str.split('').reverse().join(''));\n}",
      python:
        "import sys\ninput_line = sys.stdin.read().strip()\nx = int(input_line)\n\nif x < 0:\n    print('false')\nelse:\n    str_x = str(x)\n    print(str(str_x == str_x[::-1]).lower())",
      java: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int x = sc.nextInt();\n        \n        if (x < 0) {\n            System.out.println(false);\n        } else {\n            String str = String.valueOf(x);\n            System.out.println(str.equals(new StringBuilder(str).reverse().toString()));\n        }\n    }\n}",
    },
  },
  {
    title: "Valid Parentheses",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    difficulty: "EASY",
    tags: ["string", "stack"],
    examples: {
      python: {
        input: "()",
        output: "true",
        explanation: "The string contains valid parentheses.",
      },
      javascript: {
        input: "()[]{}",
        output: "true",
        explanation: "All brackets are properly closed.",
      },
    },
    constraints: "1 ≤ s.length ≤ 10^4",
    testCases: [
      { input: "()", output: "true" },
      { input: "()[]{}", output: "true" },
      { input: "(]", output: "false" },
    ],
    codeSnippets: {
      javascript:
        "const fs = require('fs');\n\nfunction isValid(s) {\n    // Write your code here\n    const stack = [];\n    const map = {'(': ')', '{': '}', '[': ']'};\n    \n    for (let char of s) {\n        if (map[char]) {\n            stack.push(char);\n        } else {\n            const last = stack.pop();\n            if (!last || map[last] !== char) {\n                return false;\n            }\n        }\n    }\n    return stack.length === 0;\n}\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconsole.log(isValid(input));",
      python:
        "def is_valid(s):\n    # Write your code here\n    stack = []\n    mapping = {'(': ')', '{': '}', '[': ']'}\n    \n    for char in s:\n        if char in mapping:\n            stack.append(char)\n        else:\n            if not stack or mapping[stack.pop()] != char:\n                return False\n    return len(stack) == 0\n\nimport sys\ninput_line = sys.stdin.read().strip()\nprint(str(is_valid(input_line)).lower())",
      java: "import java.util.*;\n\npublic class Main {\n    public static boolean isValid(String s) {\n        // Write your code here\n        Stack<Character> stack = new Stack<>();\n        Map<Character, Character> map = new HashMap<>();\n        map.put('(', ')');\n        map.put('{', '}');\n        map.put('[', ']');\n        \n        for (char c : s.toCharArray()) {\n            if (map.containsKey(c)) {\n                stack.push(c);\n            } else {\n                if (stack.isEmpty() || map.get(stack.pop()) != c) {\n                    return false;\n                }\n            }\n        }\n        return stack.isEmpty();\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine();\n        System.out.println(isValid(s));\n    }\n}",
    },
    referenceSolutions: {
      javascript:
        "const fs = require('fs');\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst stack = [];\nconst map = {'(': ')', '{': '}', '[': ']'};\n\nfor (let char of input) {\n    if (map[char]) {\n        stack.push(char);\n    } else {\n        const last = stack.pop();\n        if (!last || map[last] !== char) {\n            console.log(false);\n            process.exit();\n        }\n    }\n}\nconsole.log(stack.length === 0);",
      python:
        "import sys\ninput_line = sys.stdin.read().strip()\n\nstack = []\nmapping = {'(': ')', '{': '}', '[': ']'}\n\nfor char in input_line:\n    if char in mapping:\n        stack.append(char)\n    else:\n        if not stack or mapping[stack.pop()] != char:\n            print('false')\n            exit()\nprint(str(len(stack) == 0).lower())",
      java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine();\n        \n        Stack<Character> stack = new Stack<>();\n        Map<Character, Character> map = new HashMap<>();\n        map.put('(', ')');\n        map.put('{', '}');\n        map.put('[', ']');\n        \n        for (char c : s.toCharArray()) {\n            if (map.containsKey(c)) {\n                stack.push(c);\n            } else {\n                if (stack.isEmpty() || map.get(stack.pop()) != c) {\n                    System.out.println(false);\n                    return;\n                }\n            }\n        }\n        System.out.println(stack.isEmpty());\n    }\n}",
    },
  },
  {
    title: "Merge Two Sorted Arrays",
    description:
      "You are given two sorted arrays, `list1` and `list2`. Merge them into one sorted array.",
    difficulty: "EASY",
    tags: ["array", "sorting", "two-pointers"],
    examples: {
      python: {
        input: "[1,2,4] [1,3,4]",
        output: "[1,1,2,3,4,4]",
        explanation: "Merging [1,2,4] and [1,3,4] results in [1,1,2,3,4,4].",
      },
      javascript: {
        input: "[] []",
        output: "[]",
        explanation: "Both arrays are empty, so the result is empty.",
      },
    },
    constraints:
      "The number of elements in both arrays is in the range [0, 50].",
    testCases: [
      { input: "[1,2,4] [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "[] []", output: "[]" },
      { input: "[] [0]", output: "[0]" },
    ],
    codeSnippets: {
      javascript:
        "const fs = require('fs');\n\nfunction mergeTwoLists(list1, list2) {\n    // Write your code here\n    const result = [];\n    let i = 0, j = 0;\n    \n    while (i < list1.length && j < list2.length) {\n        if (list1[i] <= list2[j]) {\n            result.push(list1[i++]);\n        } else {\n            result.push(list2[j++]);\n        }\n    }\n    \n    while (i < list1.length) result.push(list1[i++]);\n    while (j < list2.length) result.push(list2[j++]);\n    \n    return result;\n}\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst parts = input.split(' ');\nconst list1 = JSON.parse(parts[0]);\nconst list2 = JSON.parse(parts[1]);\nconsole.log(JSON.stringify(mergeTwoLists(list1, list2)));",
      python:
        "def merge_two_lists(list1, list2):\n    # Write your code here\n    result = []\n    i = j = 0\n    \n    while i < len(list1) and j < len(list2):\n        if list1[i] <= list2[j]:\n            result.append(list1[i])\n            i += 1\n        else:\n            result.append(list2[j])\n            j += 1\n    \n    result.extend(list1[i:])\n    result.extend(list2[j:])\n    return result\n\nimport sys\nimport json\ninput_line = sys.stdin.read().strip()\nparts = input_line.split(' ', 1)\nlist1 = json.loads(parts[0])\nlist2 = json.loads(parts[1])\nprint(json.dumps(merge_two_lists(list1, list2)))",
      java: 'import java.util.*;\n\npublic class Main {\n    public static List<Integer> mergeTwoLists(List<Integer> list1, List<Integer> list2) {\n        // Write your code here\n        List<Integer> result = new ArrayList<>();\n        int i = 0, j = 0;\n        \n        while (i < list1.size() && j < list2.size()) {\n            if (list1.get(i) <= list2.get(j)) {\n                result.add(list1.get(i++));\n            } else {\n                result.add(list2.get(j++));\n            }\n        }\n        \n        while (i < list1.size()) result.add(list1.get(i++));\n        while (j < list2.size()) result.add(list2.get(j++));\n        \n        return result;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String input = sc.nextLine();\n        String[] parts = input.split(" ", 2);\n        \n        List<Integer> list1 = new ArrayList<>();\n        List<Integer> list2 = new ArrayList<>();\n        \n        if (!parts[0].equals("[]")) {\n            String[] nums1 = parts[0].substring(1, parts[0].length()-1).split(",");\n            for (String num : nums1) {\n                list1.add(Integer.parseInt(num.trim()));\n            }\n        }\n        \n        if (!parts[1].equals("[]")) {\n            String[] nums2 = parts[1].substring(1, parts[1].length()-1).split(",");\n            for (String num : nums2) {\n                list2.add(Integer.parseInt(num.trim()));\n            }\n        }\n        \n        System.out.println(mergeTwoLists(list1, list2));\n    }\n}',
    },
    referenceSolutions: {
      javascript:
        "const fs = require('fs');\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst parts = input.split(' ');\nconst list1 = JSON.parse(parts[0]);\nconst list2 = JSON.parse(parts[1]);\n\nconst result = [];\nlet i = 0, j = 0;\n\nwhile (i < list1.length && j < list2.length) {\n    if (list1[i] <= list2[j]) {\n        result.push(list1[i++]);\n    } else {\n        result.push(list2[j++]);\n    }\n}\n\nwhile (i < list1.length) result.push(list1[i++]);\nwhile (j < list2.length) result.push(list2[j++]);\n\nconsole.log(JSON.stringify(result));",
      python:
        "import sys\nimport json\ninput_line = sys.stdin.read().strip()\nparts = input_line.split(' ', 1)\nlist1 = json.loads(parts[0])\nlist2 = json.loads(parts[1])\n\nresult = []\ni = j = 0\n\nwhile i < len(list1) and j < len(list2):\n    if list1[i] <= list2[j]:\n        result.append(list1[i])\n        i += 1\n    else:\n        result.append(list2[j])\n        j += 1\n\nresult.extend(list1[i:])\nresult.extend(list2[j:])\nprint(json.dumps(result))",
      java: 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String input = sc.nextLine();\n        String[] parts = input.split(" ", 2);\n        \n        List<Integer> list1 = new ArrayList<>();\n        List<Integer> list2 = new ArrayList<>();\n        \n        if (!parts[0].equals("[]")) {\n            String[] nums1 = parts[0].substring(1, parts[0].length()-1).split(",");\n            for (String num : nums1) {\n                list1.add(Integer.parseInt(num.trim()));\n            }\n        }\n        \n        if (!parts[1].equals("[]")) {\n            String[] nums2 = parts[1].substring(1, parts[1].length()-1).split(",");\n            for (String num : nums2) {\n                list2.add(Integer.parseInt(num.trim()));\n            }\n        }\n        \n        List<Integer> result = new ArrayList<>();\n        int i = 0, j = 0;\n        \n        while (i < list1.size() && j < list2.size()) {\n            if (list1.get(i) <= list2.get(j)) {\n                result.add(list1.get(i++));\n            } else {\n                result.add(list2.get(j++));\n            }\n        }\n        \n        while (i < list1.size()) result.add(list1.get(i++));\n        while (j < list2.size()) result.add(list2.get(j++));\n        \n        System.out.println(result);\n    }\n}',
    },
  },
  {
    title: "Remove Duplicates from Sorted Array",
    description:
      "Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. Return the number of unique elements.",
    difficulty: "EASY",
    tags: ["array", "two-pointers"],
    examples: {
      python: {
        input: "[1,1,2]",
        output: "2",
        explanation:
          "Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively. The array nums would become [1, 2, _].",
      },
      javascript: {
        input: "[0,0,1,1,1,2,2,3,3,4]",
        output: "5",
        explanation:
          "Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively. The array nums would become [0, 1, 2, 3, 4, _, _, _, _, _].",
      },
    },
    constraints:
      "0 ≤ nums.length ≤ 3 * 10^4\n-100 ≤ nums[i] ≤ 100\n`nums` is sorted in non-decreasing order.",
    testCases: [
      { input: "[1,1,2]", output: "2" },
      { input: "[0,0,1,1,1,2,2,3,3,4]", output: "5" },
      { input: "[1,2,3]", output: "3" },
      { input: "[]", output: "0" },
      { input: "[1]", output: "1" },
    ],
    codeSnippets: {
      javascript:
        "const fs = require('fs');\n\nfunction removeDuplicates(nums) {\n    // Write your code here\n    if (nums.length === 0) return 0;\n    let k = 1; // k points to the next available position for a unique element\n    for (let i = 1; i < nums.length; i++) {\n        // If the current element is different from the previous unique element\n        if (nums[i] !== nums[k-1]) { // Corrected comparison for clarity, though nums[i] !== nums[i-1] also works in this specific setup.\n            nums[k] = nums[i]; // Place the unique element at the 'k' position\n            k++; // Increment k to point to the next available position\n        }\n    }\n    return k;\n}\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst nums = JSON.parse(input);\nconsole.log(removeDuplicates(nums));",
      python:
        "def remove_duplicates(nums):\n    # Write your code here\n    if not nums:\n        return 0\n    k = 1  # k points to the next available position for a unique element\n    for i in range(1, len(nums)):\n        # If the current element is different from the previous unique element\n        if nums[i] != nums[k-1]: # Corrected comparison for clarity\n            nums[k] = nums[i]  # Place the unique element at the 'k' position\n            k += 1 # Increment k to point to the next available position\n    return k\n\nimport sys\nimport json\ninput_line = sys.stdin.read().strip()\nnums = json.loads(input_line)\nprint(remove_duplicates(nums))",
      java: 'import java.util.*;\n\npublic class Main {\n    public static int removeDuplicates(int[] nums) {\n        // Write your code here\n        if (nums.length == 0) return 0;\n        int k = 1; // k points to the next available position for a unique element\n        for (int i = 1; i < nums.length; i++) {\n            // If the current element is different from the previous unique element\n            if (nums[i] != nums[k-1]) { // Corrected comparison for clarity\n                nums[k] = nums[i]; // Place the unique element at the \'k\' position\n                k++; // Increment k to point to the next available position\n            }\n        }\n        return k;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String input = sc.nextLine();\n        // Handle empty array input "[]" specially to avoid parsing errors\n        if (input.equals("[]")) {\n            System.out.println(0);\n            return;\n        }\n        String numsStr = input.substring(1, input.length()-1);\n        int[] nums = Arrays.stream(numsStr.split(",")).mapToInt(s -> Integer.parseInt(s.trim())).toArray();\n        System.out.println(removeDuplicates(nums));\n    }\n}',
    },
    referenceSolutions: {
      javascript:
        "const fs = require('fs');\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst nums = JSON.parse(input);\n\nif (nums.length === 0) {\n    console.log(0);\n} else {\n    let k = 1;\n    for (let i = 1; i < nums.length; i++) {\n        if (nums[i] !== nums[k-1]) {\n            nums[k] = nums[i];\n            k++;\n        }\n    }\n    console.log(k);\n}",
      python:
        "import sys\nimport json\ninput_line = sys.stdin.read().strip()\nnums = json.loads(input_line)\n\nif not nums:\n    print(0)\nelse:\n    k = 1\n    for i in range(1, len(nums)):\n        if nums[i] != nums[k-1]:\n            nums[k] = nums[i]\n            k += 1\n    print(k)",
      java: 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String input = sc.nextLine();\n        \n        if (input.equals("[]")) {\n            System.out.println(0);\n            return;\n        }\n\n        String numsStr = input.substring(1, input.length()-1);\n        int[] nums = Arrays.stream(numsStr.split(",")).mapToInt(s -> Integer.parseInt(s.trim())).toArray();\n        \n        int k = 1;\n        for (int i = 1; i < nums.length; i++) {\n            if (nums[i] != nums[k-1]) {\n                nums[k] = nums[i];\n                k++;\n            }\n        }\n        System.out.println(k);\n    }\n}',
    },
  },
  {
    title: "Maximum Subarray",
    description:
      "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    difficulty: "MEDIUM",
    tags: ["array", "divide-and-conquer", "dynamic-programming"],
    examples: {
      python: {
        input: "[-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
      },
      javascript: {
        input: "[1]",
        output: "1",
        explanation: "The subarray [1] has the largest sum 1.",
      },
    },
    constraints: "1 ≤ nums.length ≤ 10^5",
    testCases: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
      { input: "[1]", output: "1" },
      { input: "[5,4,-1,7,8]", output: "23" },
    ],
    codeSnippets: {
      javascript:
        "const fs = require('fs');\n\nfunction maxSubArray(nums) {\n    // Write your code here\n    let maxSum = nums[0];\n    let currentSum = nums[0];\n    \n    for (let i = 1; i < nums.length; i++) {\n        currentSum = Math.max(nums[i], currentSum + nums[i]);\n        maxSum = Math.max(maxSum, currentSum);\n    }\n    \n    return maxSum;\n}\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst nums = JSON.parse(input);\nconsole.log(maxSubArray(nums));",
      python:
        "def max_sub_array(nums):\n    # Write your code here\n    max_sum = nums[0]\n    current_sum = nums[0]\n    \n    for i in range(1, len(nums)):\n        current_sum = max(nums[i], current_sum + nums[i])\n        max_sum = max(max_sum, current_sum)\n    \n    return max_sum\n\nimport sys\nimport json\ninput_line = sys.stdin.read().strip()\nnums = json.loads(input_line)\nprint(max_sub_array(nums))",
      java: 'import java.util.*;\n\npublic class Main {\n    public static int maxSubArray(int[] nums) {\n        // Write your code here\n        int maxSum = nums[0];\n        int currentSum = nums[0];\n        \n        for (int i = 1; i < nums.length; i++) {\n            currentSum = Math.max(nums[i], currentSum + nums[i]);\n            maxSum = Math.max(maxSum, currentSum);\n        }\n        \n        return maxSum;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String input = sc.nextLine();\n        String numsStr = input.substring(1, input.length()-1);\n        int[] nums = Arrays.stream(numsStr.split(",")).mapToInt(s -> Integer.parseInt(s.trim())).toArray();\n        System.out.println(maxSubArray(nums));\n    }\n}',
    },
    referenceSolutions: {
      javascript:
        "const fs = require('fs');\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst nums = JSON.parse(input);\n\nlet maxSum = nums[0];\nlet currentSum = nums[0];\n\nfor (let i = 1; i < nums.length; i++) {\n    currentSum = Math.max(nums[i], currentSum + nums[i]);\n    maxSum = Math.max(maxSum, currentSum);\n}\n\nconsole.log(maxSum);",
      python:
        "import sys\nimport json\ninput_line = sys.stdin.read().strip()\nnums = json.loads(input_line)\n\nmax_sum = nums[0]\ncurrent_sum = nums[0]\n\nfor i in range(1, len(nums)):\n    current_sum = max(nums[i], current_sum + nums[i])\n    max_sum = max(max_sum, current_sum)\n\nprint(max_sum)",
      java: 'import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String input = sc.nextLine();\n        String numsStr = input.substring(1, input.length()-1);\n        int[] nums = Arrays.stream(numsStr.split(",")).mapToInt(s -> Integer.parseInt(s.trim())).toArray();\n        \n        int maxSum = nums[0];\n        int currentSum = nums[0];\n        \n        for (int i = 1; i < nums.length; i++) {\n            currentSum = Math.max(nums[i], currentSum + nums[i]);\n            maxSum = Math.max(maxSum, currentSum);\n        }\n        \n        System.out.println(maxSum);\n    }\n}',
    },
  },
  {
    title: "Climbing Stairs",
    description:
      "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    difficulty: "EASY",
    tags: ["math", "dynamic-programming", "memoization"],
    examples: {
      python: {
        input: "2",
        output: "2",
        explanation:
          "There are two ways to climb to the top: 1 step + 1 step, or 2 steps.",
      },
      javascript: {
        input: "3",
        output: "3",
        explanation: "There are three ways: 1+1+1, 1+2, 2+1.",
      },
    },
    constraints: "1 ≤ n ≤ 45",
    testCases: [
      { input: "2", output: "2" },
      { input: "3", output: "3" },
      { input: "4", output: "5" },
    ],
    codeSnippets: {
      javascript:
        "const fs = require('fs');\n\nfunction climbStairs(n) {\n    // Write your code here\n    if (n <= 2) return n;\n    let prev1 = 1, prev2 = 2;\n    for (let i = 3; i <= n; i++) {\n        let current = prev1 + prev2;\n        prev1 = prev2;\n        prev2 = current;\n    }\n    return prev2;\n}\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst n = parseInt(input);\nconsole.log(climbStairs(n));",
      python:
        "def climb_stairs(n):\n    # Write your code here\n    if n <= 2:\n        return n\n    prev1, prev2 = 1, 2\n    for i in range(3, n + 1):\n        current = prev1 + prev2\n        prev1 = prev2\n        prev2 = current\n    return prev2\n\nimport sys\ninput_line = sys.stdin.read().strip()\nn = int(input_line)\nprint(climb_stairs(n))",
      java: "import java.util.Scanner;\n\npublic class Main {\n    public static int climbStairs(int n) {\n        // Write your code here\n        if (n <= 2) return n;\n        int prev1 = 1, prev2 = 2;\n        for (int i = 3; i <= n; i++) {\n            int current = prev1 + prev2;\n            prev1 = prev2;\n            prev2 = current;\n        }\n        return prev2;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        System.out.println(climbStairs(n));\n    }\n}",
    },
    referenceSolutions: {
      javascript:
        "const fs = require('fs');\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst n = parseInt(input);\n\nif (n <= 2) {\n    console.log(n);\n} else {\n    let prev1 = 1, prev2 = 2;\n    for (let i = 3; i <= n; i++) {\n        let current = prev1 + prev2;\n        prev1 = prev2;\n        prev2 = current;\n    }\n    console.log(prev2);\n}",
      python:
        "import sys\ninput_line = sys.stdin.read().strip()\nn = int(input_line)\n\nif n <= 2:\n    print(n)\nelse:\n    prev1, prev2 = 1, 2\n    for i in range(3, n + 1):\n        current = prev1 + prev2\n        prev1 = prev2\n        prev2 = current\n    print(prev2)",
      java: "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        \n        if (n <= 2) {\n            System.out.println(n);\n        } else {\n            int prev1 = 1, prev2 = 2;\n            for (int i = 3; i <= n; i++) {\n                int current = prev1 + prev2;\n                prev1 = prev2;\n                prev2 = current;\n            }\n            System.out.println(prev2);\n        }\n    }\n}",
    },
  },
];
