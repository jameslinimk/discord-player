import { SnowflakeUtil, User } from "discord.js-selfbot-v13"
import { Player } from "../Player"
import { RawTrackData, TrackJSON } from "../types/types"
import { Playlist } from "./Playlist"
import { Queue } from "./Queue"

interface EscapeMarkdownOptions {
    codeBlock?: boolean;
    inlineCode?: boolean;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    spoiler?: boolean;
    inlineCodeContent?: boolean;
    codeBlockContent?: boolean;
}

/**
 * Escapes any Discord-flavour markdown in a string.
 * @param {string} text Content to escape
 * @param {EscapeMarkdownOptions} [options={}] Options for escaping the markdown
 * @returns {string}
 */
function escapeMarkdown(
    text: string,
    {
    codeBlock = true,
    inlineCode = true,
    bold = true,
    italic = true,
    underline = true,
    strikethrough = true,
    spoiler = true,
    codeBlockContent = true,
    inlineCodeContent = true,
    }: EscapeMarkdownOptions = {},
): string {
    if (!codeBlockContent) {
    return text
        .split('```')
        .map((subString, index, array) => {
        if (index % 2 && index !== array.length - 1) return subString;
        return escapeMarkdown(subString, {
            inlineCode,
            bold,
            italic,
            underline,
            strikethrough,
            spoiler,
            inlineCodeContent,
        });
        })
        .join(codeBlock ? '\\`\\`\\`' : '```');
    }
    if (!inlineCodeContent) {
    return text
        .split(/(?<=^|[^`])`(?=[^`]|$)/g)
        .map((subString, index, array) => {
        if (index % 2 && index !== array.length - 1) return subString;
        return escapeMarkdown(subString, {
            codeBlock,
            bold,
            italic,
            underline,
            strikethrough,
            spoiler,
        });
        })
        .join(inlineCode ? '\\`' : '`');
    }
    if (inlineCode) text = escapeInlineCode(text);
    if (codeBlock) text = escapeCodeBlock(text);
    if (italic) text = escapeItalic(text);
    if (bold) text = escapeBold(text);
    if (underline) text = escapeUnderline(text);
    if (strikethrough) text = escapeStrikethrough(text);
    if (spoiler) text = escapeSpoiler(text);
    return text;
}

/**
 * Escapes code block markdown in a string.
 * @param {string} text Content to escape
 * @returns {string}
 */
function escapeCodeBlock(text: string): string {
    return text.replace(new RegExp("```", "g"), '\\`\\`\\`');
}

/**
 * Escapes inline code markdown in a string.
 * @param {string} text Content to escape
 * @returns {string}
 */
function escapeInlineCode(text: string): string {
    return text.replace(/(?<=^|[^`])``?(?=[^`]|$)/g, match => (match.length === 2 ? '\\`\\`' : '\\`'));
}

/**
 * Escapes italic markdown in a string.
 * @param {string} text Content to escape
 * @returns {string}
 */
function escapeItalic(text: string): string {
    let i = 0;
    text = text.replace(/(?<=^|[^*])\*([^*]|\*\*|$)/g, (_, match) => {
    if (match === '**') return ++i % 2 ? `\\*${match}` : `${match}\\*`;
    return `\\*${match}`;
    });
    i = 0;
    return text.replace(/(?<=^|[^_])_([^_]|__|$)/g, (_, match) => {
    if (match === '__') return ++i % 2 ? `\\_${match}` : `${match}\\_`;
    return `\\_${match}`;
    });
}

/**
 * Escapes bold markdown in a string.
 * @param {string} text Content to escape
 * @returns {string}
 */
function escapeBold(text: string): string {
    let i = 0;
    return text.replace(/\*\*(\*)?/g, (_, match) => {
    if (match) return ++i % 2 ? `${match}\\*\\*` : `\\*\\*${match}`;
    return '\\*\\*';
    });
}

/**
 * Escapes underline markdown in a string.
 * @param {string} text Content to escape
 * @returns {string}
 */
function escapeUnderline(text: string): string {
    let i = 0;
    return text.replace(/__(_)?/g, (_, match) => {
    if (match) return ++i % 2 ? `${match}\\_\\_` : `\\_\\_${match}`;
    return '\\_\\_';
    });
}

/**
 * Escapes strikethrough markdown in a string.
 * @param {string} text Content to escape
 * @returns {string}
 */
function escapeStrikethrough(text: string): string {
    return text.replace(new RegExp('~~', "g"), '\\~\\~');
}

/**
 * Escapes spoiler markdown in a string.
 * @param {string} text Content to escape
 * @returns {string}
 */
function escapeSpoiler(text: string): string {
    return text.replace(new RegExp('||', "g"), '\\|\\|');
}

class Track {
    public player!: Player;
    public title!: string;
    public description!: string;
    public author!: string;
    public url!: string;
    public thumbnail!: string;
    public duration!: string;
    public views!: number;
    public requestedBy!: User;
    public playlist?: Playlist;
    public readonly raw: RawTrackData = {} as RawTrackData;
    public readonly id = SnowflakeUtil.generate().toString();

    /**
     * Track constructor
     * @param {Player} player The player that instantiated this Track
     * @param {RawTrackData} data Track data
     */
    constructor(player: Player, data: RawTrackData) {
        /**
         * The player that instantiated this Track
         * @name Track#player
         * @type {Player}
         * @readonly
         */
        Object.defineProperty(this, "player", { value: player, enumerable: false });

        /**
         * Title of this track
         * @name Track#title
         * @type {string}
         */

        /**
         * Description of this track
         * @name Track#description
         * @type {string}
         */

        /**
         * Author of this track
         * @name Track#author
         * @type {string}
         */

        /**
         * URL of this track
         * @name Track#url
         * @type {string}
         */

        /**
         * Thumbnail of this track
         * @name Track#thumbnail
         * @type {string}
         */

        /**
         * Duration of this track
         * @name Track#duration
         * @type {string}
         */

        /**
         * Views count of this track
         * @name Track#views
         * @type {number}
         */

        /**
         * Person who requested this track
         * @name Track#requestedBy
         * @type {User}
         */

        /**
         * If this track belongs to playlist
         * @name Track#fromPlaylist
         * @type {boolean}
         */

        /**
         * Raw track data
         * @name Track#raw
         * @type {RawTrackData}
         */

        /**
         * The track id
         * @name Track#id
         * @type {Snowflake}
         * @readonly
         */

        /**
         * The playlist which track belongs
         * @name Track#playlist
         * @type {Playlist}
         */

        void this._patch(data);
    }

    private _patch(data: RawTrackData) {
        this.title = escapeMarkdown(data.title ?? "");
        this.author = data.author ?? "";
        this.url = data.url ?? "";
        this.thumbnail = data.thumbnail ?? "";
        this.duration = data.duration ?? "";
        this.views = data.views ?? 0;
        this.requestedBy = data.requestedBy;
        this.playlist = data.playlist;

        // raw
        Object.defineProperty(this, "raw", { value: Object.assign({}, { source: data.raw?.source ?? data.source }, data.raw ?? data), enumerable: false });
    }

    /**
     * The queue in which this track is located
     * @type {Queue}
     */
    get queue(): Queue {
        return this.player.queues.find((q) => q.tracks.some((ab) => ab.id === this.id));
    }

    /**
     * The track duration in millisecond
     * @type {number}
     */
    get durationMS(): number {
        const times = (n: number, t: number) => {
            let tn = 1;
            for (let i = 0; i < t; i++) tn *= n;
            return t <= 0 ? 1000 : tn * 1000;
        };

        return this.duration
            .split(":")
            .reverse()
            .map((m, i) => parseInt(m) * times(60, i))
            .reduce((a, c) => a + c, 0);
    }

    /**
     * Returns source of this track
     * @type {TrackSource}
     */
    get source() {
        return this.raw.source ?? "arbitrary";
    }

    /**
     * String representation of this track
     * @returns {string}
     */
    toString(): string {
        return `${this.title} by ${this.author}`;
    }

    /**
     * Raw JSON representation of this track
     * @returns {TrackJSON}
     */
    toJSON(hidePlaylist?: boolean): TrackJSON {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            author: this.author,
            url: this.url,
            thumbnail: this.thumbnail,
            duration: this.duration,
            durationMS: this.durationMS,
            views: this.views,
            requestedBy: this.requestedBy?.id,
            playlist: hidePlaylist ? null : this.playlist?.toJSON() ?? null
        } as TrackJSON;
    }
}

export default Track;

export { Track }

