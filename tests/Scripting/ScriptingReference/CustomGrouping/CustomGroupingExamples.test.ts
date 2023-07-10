/**
 * @jest-environment jsdom
 */

import moment from 'moment';

import type { Task } from '../../../../src/Task';
import { SampleTasks } from '../../../TestHelpers';
import {
    type QueryInstructionLineAndDescription,
    verifyFunctionFieldGrouperSamplesForDocs,
    verifyFunctionFieldGrouperSamplesOnTasks,
} from '../../../Query/Filter/ReferenceDocs/FilterReference/VerifyFunctionFieldSamples';

window.moment = moment;

beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2023-06-10 20:00'));
});

afterEach(() => {
    jest.useRealTimers();
});

/** For example, 'task.due' */
type TaskPropertyName = string;

type CustomGroupingPropertyTestData = [TaskPropertyName, QueryInstructionLineAndDescription[], Task[]];

describe('dates', () => {
    const testData: CustomGroupingPropertyTestData[] = [
        // ---------------------------------------------------------------------------------
        // DATE FIELDS
        // ---------------------------------------------------------------------------------

        [
            'task.created',
            [
                [
                    'group by function task.created.format("YYYY-MM-DD dddd")',
                    'Like "group by created", except it uses an empty string instead of "No created date" if there is no created date',
                ],
            ],
            SampleTasks.withAllRepresentativeCreatedDates(),
        ],

        [
            'task.done',
            [
                [
                    'group by function task.done.format("YYYY-MM-DD dddd")',
                    'Like "group by done", except it uses an empty string instead of "No done date" if there is no done date',
                ],
            ],
            SampleTasks.withAllRepresentativeDoneDates(),
        ],

        [
            'task.due',
            [
                [
                    'group by function task.due.format("YYYY-MM-DD dddd")',
                    'Like "group by due", except it uses no heading, instead of a heading "No due date", if there is no due date',
                ],
                [
                    'group by function task.due.formatAsDate()',
                    'Format date as YYYY-MM-DD or empty string (so no heading) if there is no due date',
                ],
                [
                    'group by function task.due.formatAsDateAndTime()',
                    'Format date as YYYY-MM-DD HH:mm or empty string if no due date.',
                    'Note:',
                    '    This is shown for demonstration purposes.',
                    '    Currently the Tasks plugin does not support storing of times.',
                    '    Do not add times to your tasks, as it will break the reading of task data',
                ],
                [
                    'group by function task.due.format("YYYY[%%]-MM[%%] MMM", "no due date")',
                    'Group by month, for example `2023%%-05%% May` ...',
                    '    ... which gets rendered by Obsidian as `2023 May`.',
                    'Or show a default heading "no due date" if no date.',
                    'The hidden month number is added, commented-out between two `%%` strings, to control the sort order of headings.',
                    'To escape characters in format strings, you can wrap the characters in square brackets (here, `[%%]`)',
                ],
                [
                    'group by function task.due.format("YYYY[%%]-MM[%%] MMM [- Week] WW")',
                    'Group by month and week number, for example `2023%%-05%% May - Week 22` ...',
                    '    ... which gets rendered by Obsidian as `2023 May - Week 22`.',
                    'If the month number is not embedded, in some years the first or last week of the year is displayed in a non-logical order.',
                ],
            ],
            SampleTasks.withAllRepresentativeDueDates(),
        ],

        [
            'task.due.advanced',
            [
                [
                    'group by function task.due.moment?.fromNow() || ""',
                    'Group by the time from now, for example "8 days ago".',
                    'Because Moment.fromNow() is not provided by TasksDate, we need special code for when there is no date value.',
                    'Whilst interesting, the alphabetical sort order makes the headings a little hard to read',
                ],
                [
                    'group by function task.due.format("dddd")',
                    'Group by day of the week (Monday, Tuesday, etc).',
                    'The day names are sorted alphabetically',
                ],
                [
                    'group by function task.due.format("[%%]d[%%]dddd")',
                    'Group by day of the week (Sunday, Monday, Tuesday, etc).',
                    'The day names are sorted in date order, starting with Sunday',
                ],
                [
                    'group by function task.due.moment ? ( task.due.moment.day() === 0 ? task.due.format("[%%][8][%%]dddd") : task.due.format("[%%]d[%%]dddd") ) : "Undated"',
                    'Group by day of the week (Monday, Tuesday, etc).',
                    'The day names are sorted in date order, starting with Monday.',
                    'Tasks without due dates are displayed at the end, under a heading "Undated".',
                    'This is best understood by pasting it in to a Tasks block in Obsidian and then deleting parts of the expression.',
                    'The key technique is to say that if the day is Sunday (`0`), then force it to be displayed as date number `8`, so it comes after the other days of the week',
                ],
                [
                    "group by function (!task.due.moment) ? '%%4%% Undated' : result = task.due.moment.isBefore(moment(), 'day') ? '%%1%% Overdue' : result = task.due.moment.isSame(moment(), 'day') ? '%%2%% Today' : '%%3%% Future'",
                    'Group task due dates in to 4 broad categories: `Overdue`, `Today`, `Future` and `Undated`, displayed in that order.',
                    'Try this on a line before `group by due` if there are a lot of due date headings, and you would like them to be broken down in to some kind of structure.',
                    'A limitation of Tasks expressions is that they each need to fit on a single line, so this uses nested ternary operators, making it powerful but very hard to read.',
                    'In fact, for ease of development and testing, it was written in a full-fledged development environment as a series of if/else blocks, and then automatically refactored in these nested ternary operators',
                ],
                [
                    "group by function (!task.due.moment) ? '%%4%% ==Undated==' : result = task.due.moment.isBefore(moment(), 'day') ? '%%1%% ==Overdue==' : result = task.due.moment.isSame(moment(), 'day') ? '%%2%% ==Today==' : '%%3%% ==Future=='",
                    'As above, but the headings `Overdue`, `Today`, `Future` and `Undated` are highlighted.',
                    'See the sample screenshot below',
                ],
            ],
            SampleTasks.withAllRepresentativeDueDates(),
        ],

        [
            'task.happens',
            [
                [
                    'group by function task.happens.format("YYYY-MM-DD dddd")',
                    'Like "group by happens", except it uses an empty string instead of "No happens date" if there is no happens date',
                ],
            ],
            SampleTasks.withAllRepresentativeDueDates(),
        ],

        [
            'task.scheduled',
            [
                [
                    'group by function task.scheduled.format("YYYY-MM-DD dddd")',
                    'Like "group by scheduled", except it uses an empty string instead of "No scheduled date" if there is no scheduled date',
                ],
            ],
            SampleTasks.withAllRepresentativeScheduledDates(),
        ],

        [
            'task.start',
            [
                [
                    'group by function task.start.format("YYYY-MM-DD dddd")',
                    'Like "group by start", except it uses an empty string instead of "No start date" if there is no start date',
                ],
            ],
            SampleTasks.withAllRepresentativeStartDates(),
        ],
    ];

    it.each(testData)('%s results', (_: string, groups: QueryInstructionLineAndDescription[], tasks: Task[]) => {
        verifyFunctionFieldGrouperSamplesOnTasks(groups, tasks);
    });

    it.each(testData)('%s docs', (_: string, groups: QueryInstructionLineAndDescription[], _tasks: Task[]) => {
        verifyFunctionFieldGrouperSamplesForDocs(groups);
    });
});

describe('file properties', () => {
    const testData: CustomGroupingPropertyTestData[] = [
        // ---------------------------------------------------------------------------------
        // FILE FIELDS
        // ---------------------------------------------------------------------------------

        [
            'task.file.path',
            [
                // comment to force line break
                ['group by function task.file.path', "Like 'group by path' but includes the file extension"],
            ],
            SampleTasks.withAllRootsPathsHeadings(),
        ],

        [
            'task.file.root',
            [
                // comment to force line break
                ['group by function task.file.root', "Same as 'group by root'"],
            ],
            SampleTasks.withAllRootsPathsHeadings(),
        ],

        [
            'task.file.folder',
            [
                // comment to force line break
                ['group by function task.file.folder', "Same as 'group by folder'"],
                [
                    "group by function task.file.folder.slice(0, -1).split('/').pop() + '/'",
                    'Group by the immediate parent folder of the file containing task.',
                    "Here's how it works:",
                    "    '.slice(0, -1)' removes the trailing slash ('/') from the original folder.",
                    "    '.split('/')' divides the remaining path up in to an array of folder names.",
                    "    '.pop()' returns the last folder name, that is, the parent of the file containing the task.",
                    '    Then the trailing slash is added back, to ensure we do not get an empty string for files in the top level of the vault',
                ],
            ],
            SampleTasks.withAllRootsPathsHeadings(),
        ],

        [
            'task.file.filename',
            [
                ['group by function task.file.filename', "Like 'group by filename' but does not link to the file"],
                [
                    "group by function  '[[' + task.file.filename.replace('.md', '') + ( task.hasHeading ? ('#' + task.heading) : '')  + ']]'",
                    "Like 'group by backlink' but links to the heading in the file",
                ],
            ],
            SampleTasks.withAllRootsPathsHeadings(),
        ],

        [
            'task.heading',
            [
                [
                    "group by function (task.heading + '.md' === task.file.filename) ? '' : task.heading",
                    'Group by heading, but only if the heading differs from the file name.',
                    "This works well immediately after a 'group by filename' line.",
                    "Note the three equals signs '===': these are important for safety in JavaScript",
                ],
            ],
            SampleTasks.withAllRootsPathsHeadings(),
        ],
    ];

    it.each(testData)('%s results', (_: string, groups: QueryInstructionLineAndDescription[], tasks: Task[]) => {
        verifyFunctionFieldGrouperSamplesOnTasks(groups, tasks);
    });

    it.each(testData)('%s docs', (_: string, groups: QueryInstructionLineAndDescription[], _tasks: Task[]) => {
        verifyFunctionFieldGrouperSamplesForDocs(groups);
    });
});

describe('statuses', () => {
    const testData: CustomGroupingPropertyTestData[] = [
        [
            'task.status.name',
            [
                ['group by function task.status.name', 'Identical to "group by status.name"'],
                ['group by function task.status.name.toUpperCase()', 'Convert the status names to capitals'],
            ],
            SampleTasks.withAllStatuses(),
        ],

        [
            'task.status.nextSymbol',
            [
                [
                    'group by function "Next status symbol: " + task.status.nextSymbol.replace(" ", "space")',
                    'Group by the next status symbol, making space characters visible',
                ],
            ],
            SampleTasks.withAllStatuses(),
        ],

        [
            'task.status.symbol',
            [
                [
                    'group by function "Status symbol: " + task.status.symbol.replace(" ", "space")',
                    'Group by the status symbol, making space characters visible',
                ],
            ],
            SampleTasks.withAllStatuses(),
        ],

        [
            'task.status.type',
            [
                [
                    'group by function task.status.type',
                    'Unlike "group by status.type", this sorts the status types in alphabetical order',
                ],
            ],
            SampleTasks.withAllStatuses(),
        ],
    ];

    it.each(testData)('%s results', (_: string, groups: QueryInstructionLineAndDescription[], tasks: Task[]) => {
        verifyFunctionFieldGrouperSamplesOnTasks(groups, tasks);
    });

    it.each(testData)('%s docs', (_: string, groups: QueryInstructionLineAndDescription[], _tasks: Task[]) => {
        verifyFunctionFieldGrouperSamplesForDocs(groups);
    });
});

describe('other properties', () => {
    const testData: CustomGroupingPropertyTestData[] = [
        // ---------------------------------------------------------------------------------
        // RECURRENCE FIELDS
        // ---------------------------------------------------------------------------------

        [
            'task.isRecurring',
            [
                [
                    'group by function task.isRecurring ? "Recurring" : "Non-Recurring"',
                    "Use JavaScript's ternary operator to choose what to do for true (after the ?) and false (after the :) values",
                ],
            ],
            SampleTasks.withAllRecurrences(),
        ],

        [
            'task.recurrenceRule',
            [
                [
                    "group by function task.recurrenceRule.replace('when done', '==when done==')",
                    'Group by recurrence rule, highlighting any occurrences of the words "when done"',
                ],
            ],
            SampleTasks.withAllRecurrences(),
        ],

        // ---------------------------------------------------------------------------------
        // OTHER FIELDS
        // ---------------------------------------------------------------------------------
        [
            'task.blockLink',
            [
                [
                    "group by function task.blockLink.replace(' ^', '')",
                    'DO NOT RELEASE UNTIL THE LEADING SPACE IS REMOVED FROM BLOCKLINKS. Removing the leading space and carat prevents the rendered heading itself being treated as a blocklink.',
                ],
            ],
            SampleTasks.withAllRepresentativeBlockLinks(),
        ],

        [
            'task.description',
            [
                [
                    'group by function task.description',
                    'group by description.',
                    'This might be useful for finding completed recurrences of the same task',
                ],
                ['group by function task.description.toUpperCase()', 'Convert the description to capitals'],
                [
                    'group by function task.description.slice(0, 25)',
                    'Truncate descriptions to at most their first 25 characters, and group by that string',
                ],
                [
                    "group by function task.description.replace('short', '==short==')",
                    'Highlight the word "short" in any group descriptions',
                ],
            ],
            SampleTasks.withAllRepresentativeDescriptions().concat(SampleTasks.withRepresentativeTags()),
        ],

        [
            'task.descriptionWithoutTags',
            [
                [
                    'group by function task.descriptionWithoutTags',
                    'Like `group by description`, but it removes any tags from the group headings.',
                    'This might be useful for finding completed recurrences of the same task, even if the tags differ in some recurrences',
                ],
            ],
            SampleTasks.withAllRepresentativeDescriptions().concat(SampleTasks.withRepresentativeTags()),
        ],

        // [
        //     'task.indentation',
        //     [['group by function task.indentation', '...']],
        //     SampleTasks.withAllPriorities(), // TODO Choose specific tasks for task.indentation'
        // ],

        [
            'task.isDone',
            [
                [
                    'group by function task.isDone ? "Action Required" : "Nothing To Do"',
                    "Use JavaScript's ternary operator to choose what to do for true (after the ?) and false (after the :) values",
                ],
            ],
            SampleTasks.withAllStatuses(),
        ],

        // [
        //     'task.listMarker',
        //     [['group by function task.listMarker', '...']],
        //     SampleTasks.withAllPriorities(), // TODO Choose specific tasks for task.listMarker'
        // ],

        [
            'task.priorityName',
            [
                [
                    'group by function task.priorityName',
                    "Group by the task's priority name",
                    'The priority names are displayed in alphabetical order.',
                    "Note that the default priority is called 'Normal', as opposed to with `group by priority` which calls the default 'None'",
                ],
                [
                    "group by function '%%' + task.priorityNumber.toString() + '%%' + task.priorityName +' priority'",
                    "Group by the task's priority name",
                    'The hidden priority number ensures that the headings are written from highest to lowest priority.',
                    "Note that the default priority is called 'Normal', as opposed to with `group by priority` which calls the default 'None'",
                ],
            ],
            SampleTasks.withAllPriorities(),
        ],

        [
            'task.priorityNumber',
            [
                [
                    'group by function task.priorityNumber',
                    "Group by the task's priority number, where Highest is 0 and Lowest is 5",
                ],
            ],
            SampleTasks.withAllPriorities(),
        ],

        [
            'task.tags',
            [
                [
                    'group by function task.tags',
                    'Like "group by tags" except that tasks with no tags have no heading instead of "(No tags)"',
                ],
                [
                    'group by function task.tags.join(", ")',
                    'Tasks with multiple tags are listed once, with a heading that combines all the tags.',
                    'Separating with commas means the tags are clickable in the headings',
                ],
                [
                    'group by function task.tags.sort().join(", ")',
                    'As above, but sorting the tags first ensures that the final headings are independent of order of tags in the tasks',
                ],
                [
                    'group by function task.tags.filter( (tag) => tag.includes("#context/") )',
                    'Only create headings for tags that contain "#context/"',
                ],
                [
                    'group by function task.tags.filter( (tag) => ! tag.includes("#tag") )',
                    'Create headings for all tags that do not contain "#tag"',
                ],
            ],
            SampleTasks.withRepresentativeTags(),
        ],

        [
            'task.tags.advanced',
            [
                // These 4 examples are a different, simpler approach to the reply in https://github.com/obsidian-tasks-group/obsidian-tasks/issues/1677:
                [
                    "group by function task.tags.map( (tag) => tag.split('/')[0].replace('#', '') )",
                    '`#tag/subtag/sub-sub-tag` gives **`tag`**',
                ],
                [
                    "group by function task.tags.map( (tag) => tag.split('/')[1] ? tag.split('/').slice(1, 2) : '')",
                    '`#tag/subtag/sub-sub-tag` gives **`subtag`**',
                ],
                [
                    "group by function task.tags.map( (tag) => tag.split('/')[2] ? tag.split('/').slice(2, 3) : '')",
                    '`#tag/subtag/sub-sub-tag` gives **`sub-sub-tag`**',
                ],
                [
                    "group by function task.tags.map( (tag) => tag.split('/')[3] ? tag.split('/').slice(3, 4) : '')",
                    '`#tag/subtag/sub-sub-tag` gives no heading, as there is no value at the 4th level',
                ],

                // These 4 examples came from https://github.com/obsidian-tasks-group/obsidian-tasks/issues/1677:
                [
                    "group by function task.tags.map( (tag) => tag.split('/')[0] )",
                    '`#tag/subtag/sub-sub-tag` gives **`#tag`**',
                ],
                [
                    "group by function task.tags.map( (tag) => tag.split('/')[1] ? tag.split('/').slice(0, 2).join('/') : '')",
                    '`#tag/subtag/sub-sub-tag` gives **`#tag/subtag`**',
                ],
                [
                    "group by function task.tags.map( (tag) => tag.split('/')[2] ? tag.split('/').slice(0, 3).join('/') : '')",
                    '`#tag/subtag/sub-sub-tag` gives **`#tag/subtag/sub-sub-tag`**',
                ],
                [
                    "group by function task.tags.map( (tag) => tag.split('/')[3] ? tag.split('/').slice(0, 4).join('/') : '')",
                    '`#tag/subtag/sub-sub-tag` gives no heading, as there is no value at the 4th level',
                ],
            ],
            SampleTasks.withRepresentativeTags(),
        ],

        [
            'task.originalMarkdown',
            [
                [
                    "group by function '``' + task.originalMarkdown + '``'",
                    "Group by the raw text of the task's original line in the MarkDown file as code.",
                    "Note the pairs of backtick characters ('`'), to preserve even single backtick characters in the task line.",
                    "It's important to prevent the task checkbox (for example, '[ ]') from being rendered in the heading, as it gets very confusing if there are checkboxes on both headings and tasks",
                ],
                [
                    "group by function task.originalMarkdown.replace(/^[^\\[\\]]+\\[.\\] */, '')",
                    'An alternative to formatting the markdown line as code is to remove everything up to the end of the checkbox.',
                    'Then render the rest of the task line as normal markdown',
                ],
            ],
            SampleTasks.withRepresentativeTags(),
        ],

        [
            'task.urgency',
            [
                [
                    'group by function task.urgency.toFixed(3)',
                    'Show the urgency to 3 decimal places, unlike the built-in "group by urgency" which uses 2',
                ],
            ],
            SampleTasks.withAllPriorities(),
        ],
    ];

    it.each(testData)('%s results', (_: string, groups: QueryInstructionLineAndDescription[], tasks: Task[]) => {
        verifyFunctionFieldGrouperSamplesOnTasks(groups, tasks);
    });

    it.each(testData)('%s docs', (_: string, groups: QueryInstructionLineAndDescription[], _tasks: Task[]) => {
        verifyFunctionFieldGrouperSamplesForDocs(groups);
    });
});

describe('special cases', () => {
    const testData: CustomGroupingPropertyTestData[] = [
        [
            'formatting',
            [
                [
                    'group by function task.due.format("YYYY %%MM%% MMMM [<mark style=\'background: var(--color-base-00); color: var(--color-base-40)\'>- Week</mark>] WW", "Undated")',
                    'Show Year then Month, and then week number. Draw the fixed text paler, to de-emphasize it.',
                ],
                [
                    'group by function task.due.format("[%%]YYYY-MM-DD[%%]dddd [<mark style=\'background: var(--color-base-00); color: var(--color-base-40);\'>](YYYY-MM-DD)[</mark>]")',
                    'Show the day of the week, then the date in paler text',
                ],
            ],
            SampleTasks.withAllRepresentativeDueDates(),
        ],

        // idea: folder: show stripping out the folder containing the query file - may need to escape forward slashes if using regular expression
    ];

    it.each(testData)('%s results', (_: string, groups: QueryInstructionLineAndDescription[], tasks: Task[]) => {
        verifyFunctionFieldGrouperSamplesOnTasks(groups, tasks);
    });

    it.each(testData)('%s docs', (_: string, groups: QueryInstructionLineAndDescription[], _tasks: Task[]) => {
        verifyFunctionFieldGrouperSamplesForDocs(groups);
    });
});