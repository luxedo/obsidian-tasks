export const yaml_complex_example = {
    filePath: 'Test Data/yaml_complex_example.md',
    fileContents:
        '---\n' +
        'TAG:\n' +
        '  - value1\n' +
        '  - value2\n' +
        'ALIAS:\n' +
        '  - test 1\n' +
        '  - test 2\n' +
        'custom_list:\n' +
        '  - value 1\n' +
        '  - value 2\n' +
        'custom_list_2:\n' +
        '  - x\n' +
        'custom_number_prop: 42\n' +
        'unknown_property:\n' +
        '  - hello\n' +
        '  - world\n' +
        'unknown_property_2:\n' +
        '  - 1\n' +
        '  - 2\n' +
        'unknown_number_property: 13\n' +
        'unknown_empty_property:\n' +
        'unknown_list:\n' +
        '  -\n' +
        '  -\n' +
        'parent:\n' +
        '  - child1:\n' +
        '    - grandchild1: 1\n' +
        '    - grandchild2: 2\n' +
        '  - child2:\n' +
        '    - grandchild3: 3\n' +
        '    - grandchild4: 4\n' +
        '---\n' +
        '\n' +
        '# yaml_complex_example\n' +
        '\n' +
        "- [ ] #task Task in 'yaml_complex_example'\n",
    cachedMetadata: {
        tags: [
            {
                position: {
                    start: {
                        line: 35,
                        col: 6,
                        offset: 436,
                    },
                    end: {
                        line: 35,
                        col: 11,
                        offset: 441,
                    },
                },
                tag: '#task',
            },
        ],
        headings: [
            {
                position: {
                    start: {
                        line: 33,
                        col: 0,
                        offset: 406,
                    },
                    end: {
                        line: 33,
                        col: 22,
                        offset: 428,
                    },
                },
                heading: 'yaml_complex_example',
                level: 1,
            },
        ],
        sections: [
            {
                type: 'yaml',
                position: {
                    start: {
                        line: 0,
                        col: 0,
                        offset: 0,
                    },
                    end: {
                        line: 31,
                        col: 3,
                        offset: 404,
                    },
                },
            },
            {
                type: 'heading',
                position: {
                    start: {
                        line: 33,
                        col: 0,
                        offset: 406,
                    },
                    end: {
                        line: 33,
                        col: 22,
                        offset: 428,
                    },
                },
            },
            {
                type: 'list',
                position: {
                    start: {
                        line: 35,
                        col: 0,
                        offset: 430,
                    },
                    end: {
                        line: 35,
                        col: 42,
                        offset: 472,
                    },
                },
            },
        ],
        listItems: [
            {
                position: {
                    start: {
                        line: 35,
                        col: 0,
                        offset: 430,
                    },
                    end: {
                        line: 35,
                        col: 42,
                        offset: 472,
                    },
                },
                parent: -35,
                task: ' ',
            },
        ],
        frontmatter: {
            TAG: ['value1', 'value2'],
            ALIAS: ['test 1', 'test 2'],
            custom_list: ['value 1', 'value 2'],
            custom_list_2: ['x'],
            custom_number_prop: 42,
            unknown_property: ['hello', 'world'],
            unknown_property_2: [1, 2],
            unknown_number_property: 13,
            unknown_empty_property: null,
            unknown_list: [null, null],
            parent: [
                {
                    child1: [
                        {
                            grandchild1: 1,
                        },
                        {
                            grandchild2: 2,
                        },
                    ],
                },
                {
                    child2: [
                        {
                            grandchild3: 3,
                        },
                        {
                            grandchild4: 4,
                        },
                    ],
                },
            ],
        },
        frontmatterPosition: {
            start: {
                line: 0,
                col: 0,
                offset: 0,
            },
            end: {
                line: 31,
                col: 3,
                offset: 404,
            },
        },
        frontmatterLinks: [],
    },
    obsidianApiVersion: '1.6.5',
};
