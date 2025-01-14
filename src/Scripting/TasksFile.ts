import { type CachedMetadata, type FrontMatterCache, getAllTags, parseFrontMatterTags } from 'obsidian';

/**
 * A simple class to provide access to file information via 'task.file' in scripting code.
 */
export class TasksFile {
    private readonly _path: string;
    private readonly _cachedMetadata: CachedMetadata;

    constructor(path: string, cachedMetadata: CachedMetadata = {}) {
        this._path = path;
        this._cachedMetadata = cachedMetadata;
    }

    /**
     * Return the path to the file.
     */
    get path(): string {
        return this._path;
    }

    /**
     * Return all the tags in the file, both from frontmatter and the body of the file.
     *
     * It adds the `#` prefix to tags in the frontmatter.
     * For now, it includes any global filter that is a tag, if there are any tasks in the file
     * that have the global filter. This decision will be reviewed later.
     *
     * @todo Review presence of global filter tag in the results.
     */
    get tags(): string[] {
        return getAllTags(this.cachedMetadata) ?? [];
    }

    /**
     * Return the sanitised tags from the frontmatter.
     *
     * It recognises both frontmatter.tags and frontmatter.tag (and various capitalisation combinations too)
     * It adds the `#` prefix, and removes any null tags.
     * We would like to make it accessible via task.frontmatter.tags eventually.
     *
     * For now, it includes any global filter that is a tag, if there are any tasks in the file
     * that have the global filter. This decision will be reviewed later.
     *
     * @todo Review presence of global filter tag in the results.
     *       Or should that not be relevant for tags in the frontmatter?
     */
    get frontmatterTags(): string[] {
        return parseFrontMatterTags(this.cachedMetadata.frontmatter) ?? [];
    }

    /**
     * Return Obsidian's [CachedMetadata](https://docs.obsidian.md/Reference/TypeScript+API/CachedMetadata)
     * for this file, if available.
     *
     * @note This is currently only populated for Task objects when read in the Obsidian plugin.
     *       It's not populated for queries in the plugin, nor in most unit tests.
     *       If not available, it returns an empty object, {}.
     */
    public get cachedMetadata(): CachedMetadata {
        return this._cachedMetadata;
    }

    /**
     * Return Obsidian's [FrontMatterCache](https://docs.obsidian.md/Reference/TypeScript+API/FrontMatterCache)
     * for this file, if available.
     *
     * @note This is currently only populated for Task objects when read in the Obsidian plugin.
     *       It's not populated for queries in the plugin, nor in most unit tests.
     *       And it is an empty object, {}, if the {@link cachedMetadata} has not been populated
     *       or if the markdown file has no frontmatter or empty frontmatter.
     */
    public get frontmatter(): FrontMatterCache {
        return this._cachedMetadata.frontmatter ?? ({} as FrontMatterCache);
    }

    /**
     * Return the path to the file, with the filename extension removed.
     */
    get pathWithoutExtension(): string {
        return this.withoutExtension(this.path);
    }

    private withoutExtension(value: string) {
        return value.replace(/\.md$/, '');
    }

    /**
     * Return the root to the file.
     */
    get root(): string {
        let path = this.path.replace(/\\/g, '/');

        if (path.charAt(0) === '/') {
            path = path.substring(1);
        }

        const separatorIndex = path.indexOf('/');
        if (separatorIndex == -1) {
            return '/';
        }
        return path.substring(0, separatorIndex + 1);
    }

    get folder(): string {
        const path = this.path;
        const fileNameWithExtension = this.filename;
        const folder = path.substring(0, path.lastIndexOf(fileNameWithExtension));
        if (folder === '') {
            return '/';
        }
        return folder;
    }

    /**
     * Return the filename including the extension.
     */
    get filename(): string {
        // Copied from Task.filename and FilenameField.value() initially
        const fileNameMatch = this.path.match(/([^/]+)$/);
        if (fileNameMatch !== null) {
            return fileNameMatch[1];
        } else {
            return '';
        }
    }

    get filenameWithoutExtension(): string {
        return this.withoutExtension(this.filename);
    }
}
