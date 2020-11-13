/* index.d.ts (C) 2015-present SheetJS and contributors */
// TypeScript Version: 2.2
import * as CFB from "cfb";
import * as SSF from "ssf";

/** Version string */
export const version: string;

/** SSF Formatter Library */
export { SSF };

/** CFB Library */
export { CFB };

/** NODE ONLY! Attempts to read filename and parse */
/** NODE ONLY! 读取文件名并解析 */
export function readFile(filename: string, opts?: ParsingOptions): WorkBook;
/** Attempts to parse data */
/** 尝试解析数据 */
export function read(data: any, opts?: ParsingOptions): WorkBook;
/** Attempts to write or download workbook data to file */
/** 尝试写入或下载工作簿数据到文件 */
export function writeFile(data: WorkBook, filename: string, opts?: WritingOptions): any;
/** Attempts to write the workbook data */
/** 尝试写入工作簿数据 */
export function write(data: WorkBook, opts?: WritingOptions): any;

/** Utility Functions */
export const utils: XLSX$Utils;
/** Stream Utility Functions */
export const stream: StreamUtils;

/** Number Format (either a string or an index to the format table) */
/** 数字格式(格式表的字符串或索引) */
export type NumberFormat = string | number;

/** Worksheet specifier (string, number, worksheet) */
/** 工作表说明符(字符串、数字、工作表) */
export type WSSpec = string | number | WorkSheet;

/** Range specifier (string or range or cell), single-cell lifted to range */
/** 范围说明符(字符串或范围或单元格)，单元格提升到范围 */
export type RangeSpec = string | Range | CellAddress;

/** Basic File Properties */
export interface Properties {
    /** Summary tab "Title" */
	/** 标题 */
    Title?: string;
    /** Summary tab "Subject" */
	/** 主题 */
    Subject?: string;
    /** Summary tab "Author" */
	/** 作者 */
    Author?: string;
    /** Summary tab "Manager" */
	/** 经理 */
    Manager?: string;
    /** Summary tab "Company" */
	/** 公司 */
    Company?: string;
    /** Summary tab "Category" */
	/** 类别 */
    Category?: string;
    /** Summary tab "Keywords" */
	/** 关键字 */
    Keywords?: string;
    /** Summary tab "Comments" */
	/** 评论 */
    Comments?: string;
    /** Statistics tab "Last saved by" */
	/** 最近一位作者 */
    LastAuthor?: string;
    /** Statistics tab "Created" */
	/** 创建日期 */
    CreatedDate?: Date;
}

/** Other supported properties */
export interface FullProperties extends Properties {
    ModifiedDate?: Date; // 修改日期
    Application?: string; // 应用程序
    AppVersion?: string; // 程序版本
    DocSecurity?: string; // 文档安全
    HyperlinksChanged?: boolean; // 超链接变更
    SharedDoc?: boolean; // 共享文档
    LinksUpToDate?: boolean; // 
    ScaleCrop?: boolean; // 
    Worksheets?: number; // 工作表
    SheetNames?: string[]; // 表名
    ContentStatus?: string; // 内容状态
    LastPrinted?: string; // 最近印刷
    Revision?: string | number; // 修订
    Version?: string; // 版本
    Identifier?: string; // 标识符
    Language?: string; // 语言
}

export interface CommonOptions {
    /**
     * If true, throw errors when features are not understood
	 * 如果为真，抛出特性无法被理解时抛出异常
     * @default false
     */
    WTF?: boolean;

    /**
     * When reading a file with VBA macros, expose CFB blob to `vbaraw` field
	 * 当使用VBA宏读取文件时，暴露CFB blob到' vbaraw '字段
     * When writing BIFF8/XLSB/XLSM, reseat `vbaraw` and export to file
	 * 当编写BIFF8/XLSB/XLSM，重置' vbaraw '并导出到文件
     * @default false
     */
    bookVBA?: boolean;

    /**
     * When reading a file, store dates as type d (default is n)
	 * 读取文件时，将日期存储为类型d(默认为n)
     * When writing XLSX/XLSM file, use native date (default uses date codes)
	 * 在编写XLSX/XLSM文件时，使用本机日期(默认使用日期代码)
     * @default false
     */
    cellDates?: boolean;

    /**
     * Create cell objects for stub cells
	 * 为存根单元创建单元格对象
     * @default false
     */
    sheetStubs?: boolean;

    /**
     * When reading a file, save style/theme info to the .s field
	 * 当读取文件时，保存样式/主题信息到 .s字段
     * When writing a file, export style/theme info
	 * 当写一个文件，导出风格/主题信息
     * @default false
     */
    cellStyles?: boolean;

    /**
     * If defined and file is encrypted, use password
	 * 如果文件加密，请使用密码
     * @default ''
     */
    password?: string;
}

export interface DateNFOption {
    /** 
	 * Use specified date format
	 * 使用指定日期格式
	 */
    dateNF?: NumberFormat;
}

/** Options for read and readFile */
export interface ParsingOptions extends CommonOptions {
    /** Input data encoding */
    /** 输入数据编码 */
    type?: 'base64' | 'binary' | 'buffer' | 'file' | 'array' | 'string';

    /** Default codepage */
    /** 默认代码页 */
    codepage?: number;

    /**
     * Save formulae to the .f field
     * 保存公式式到 .f 字段
     * @default true
     */
    cellFormula?: boolean;

    /**
     * Parse rich text and save HTML to the .h field
     * 解析富文本并将HTML保存到 .h字段
     * @default true
     */
    cellHTML?: boolean;

    /**
     * Save number format string to the .z field
     * 将数字格式字符串保存到.z字段
     * @default false
     */
    cellNF?: boolean;

    /**
     * Generate formatted text to the .w field
     * 生成格式化文本到.w字段
     * @default true
     */
    cellText?: boolean;

    /** Override default date format (code 14) */
    /** 重写默认日期格式 */
    dateNF?: string;

    /**
     * If >0, read the first sheetRows rows
     * 如果>0，读取第一行
     * @default 0
     */
    sheetRows?: number;

    /**
     * If true, parse calculation chains
     * 如果为真，解析计算链
     * @default false
     */
    bookDeps?: boolean;

    /**
     * If true, add raw files to book object
     * 如果为真，添加原始文件到book对象
     * @default false
     */
    bookFiles?: boolean;

    /**
     * If true, only parse enough to get book metadata
     * 如果为证，则只解析足够的元数据
     * @default false
     */
    bookProps?: boolean;

    /**
     * If true, only parse enough to get the sheet names
     * 如果为真，则仅解析足够的内容以获得工作表名称
     * @default false
     */
    bookSheets?: boolean;

    /** If specified, only parse the specified sheets or sheet names */
    /** 如果指定，则只解析指定的工作表或工作表名称 */
    sheets?: number | string | Array<number | string>;

    /** If true, plaintext parsing will not parse values */
    /** 如果为真，纯文本解析将无法解析值 */
    raw?: boolean;

    dense?: boolean;
}

/** Options for write and writeFile */
/** 写入 */
export interface WritingOptions extends CommonOptions {
    /** Output data encoding */
    /** 输出数据编码 */
    type?: 'base64' | 'binary' | 'buffer' | 'file' | 'array' | 'string';

    /**
     * Generate Shared String Table
     * 生成共享字符串表
     * @default false
     */
    bookSST?: boolean;

    /**
     * File format of generated workbook
     * 生成工作簿的文件格式
     * @default 'xlsx'
     */
    bookType?: BookType;

    /**
     * Name of Worksheet (for single-sheet formats)
     * 工作表名称 (适用于单张格式)
     * @default ''
     */
    sheet?: string;

    /**
     * Use ZIP compression for ZIP-based formats
     * 基于ZIP的格式使用ZIP压缩
     * @default false
     */
    compression?: boolean;

    /**
     * Suppress "number stored as text" errors in generated files
     * 在生成的文件中阻止“数字存储为文本”错误
     * @default true
     */
    ignoreEC?: boolean;

    /** Override workbook properties on save */
    /** 在保存时重写工作簿属性 */
    Props?: Properties;
}

/** Workbook Object */
/** 工作簿对象 */
export interface WorkBook {
    /**
     * A dictionary of the worksheets in the workbook.
     * 工作簿中的工作表字典
     * Use SheetNames to reference these.
     * 使用表格名称作为参考
     */
    Sheets: { [sheet: string]: WorkSheet };

    /** Ordered list of the sheet names in the workbook */
    /** 工作簿名称顺序 */
    SheetNames: string[];

    /** Standard workbook Properties */
    /** 标准的工作簿属性 */
    Props?: FullProperties;

    /** Custom workbook Properties */
    /** 自定义工作簿属性 */
    Custprops?: object;

    Workbook?: WBProps;

    vbaraw?: any;
}

export interface SheetProps {
    /** Name of Sheet */
    /** 表名 */
    name?: string;

    /** Sheet Visibility (0=Visible 1=Hidden 2=VeryHidden) */
    /** 表单可见(0=可见 1=隐藏 2=非常隐藏) */
    Hidden?: 0 | 1 | 2;

    /** Name of Document Module in associated VBA Project */
    /** 相关VBA项目中的文档模块的名称 */
    CodeName?: string;
}

/** Defined Name Object */
/** 定义名称的对象 */
export interface DefinedName {
    /** Name */
    /** 名称 */
    Name: string;

    /** Reference */
    /** 引用 */
    Ref: string;

    /** Scope (undefined for workbook scope) */
    /** 范围(未为工作簿范围定义) */
    Sheet?: number;

    /** Name comment */
    /** 名称描述 */
    Comment?: string;
}

/** Workbook-Level Attributes */
/** 工作簿等级 */
export interface WBProps {
    /** Sheet Properties */
    /** 表属性 */
    Sheets?: SheetProps[];

    /** Defined Names */
    /** 定义的名称 */
    Names?: DefinedName[];

    /** Workbook Views */
    /** 工作簿视图 */
    Views?: WBView[];

    /** Other Workbook Properties */
    /** 其他工作簿属性 */
    WBProps?: WorkbookProperties;
}

/** Workbook View */
export interface WBView {
    /** Right-to-left mode */
    /** 从右到左的模式 */
    RTL?: boolean;
}

/** Other Workbook Properties */
/** 其他工作簿属性 */
export interface WorkbookProperties {
    /** Worksheet Epoch (1904 if true, 1900 if false) */
    /** TODO: 工作表纪元 */
    date1904?: boolean;

    /** Warn or strip personally identifying info on save */
    /** 过滤个人信息信息保存 */
    filterPrivacy?: boolean;

    /** Name of Document Module in associated VBA Project */
    /** 相关VBA项目中的文档模块的名称 */
    CodeName?: string;
}

/** Column Properties Object */
/** 列属性对象 */
export interface ColInfo {
    /* --- visibility --- */

    /** if true, the column is hidden */
    /** 如果为真，该列将被隐藏 */
    hidden?: boolean;

    /* --- column width --- */

    /** width in Excel's "Max Digit Width", width*256 is integral */
    /** 在Excel的“最大数字宽度”中，width*256是整数 */
    width?: number;

    /** width in screen pixels */
    /** 屏幕像素宽度 */
    wpx?: number;

    /** width in "characters" */
    /** 字符宽度 */
    wch?: number;

    /** Excel's "Max Digit Width" unit, always integral */
    /**  Excel的“最大数字宽度”单位，总是 integral */
    MDW?: number;
}

/** Row Properties Object */
/** 行属性对象 */
export interface RowInfo {
    /* --- visibility --- */

    /** if true, the column is hidden */
    /** 如果为真，该列将被隐藏 */
    hidden?: boolean;

    /* --- row height --- */

    /** height in screen pixels */
    /** 屏幕像素高度 */
    hpx?: number;

    /** height in points */
    /** 高度的points */
    hpt?: number;

    /** outline / group level */
    /** 等级 */
    level?: number;
}

/**
 * Write sheet protection properties.
 * 工作簿写入保护属性.
 */
export interface ProtectInfo {
    /**
     * The password for formats that support password-protected sheets
     * 支持密码保护表的格式的密码
     * (XLSX/XLSB/XLS). The writer uses the XOR obfuscation method.
     * 作者使用异或混淆方法
     */
    password?: string;
    /**
     * Select locked cells
     * 选中锁定单元格
     * @default: true
     */
    selectLockedCells?: boolean;
    /**
     * Select unlocked cells
     * 选中未锁定的单元格
     * @default: true
     */
    selectUnlockedCells?: boolean;
    /**
     * Format cells
     * 单元格格式
     * @default: false
     */
    formatCells?: boolean;
    /**
     * Format columns
     * 列格式
     * @default: false
     */
    formatColumns?: boolean;
    /**
     * Format rows
     * 行格式
     * @default: false
     */
    formatRows?: boolean;
    /**
     * Insert columns
     * 插入列
     * @default: false
     */
    insertColumns?: boolean;
    /**
     * Insert rows
     * 插入行
     * @default: false
     */
    insertRows?: boolean;
    /**
     * Insert hyperlinks
     * 插入超链接
     * @default: false
     */
    insertHyperlinks?: boolean;
    /**
     * Delete columns
     * 删除列
     * @default: false
     */
    deleteColumns?: boolean;
    /**
     * Delete rows
     * 删除行
     * @default: false
     */
    deleteRows?: boolean;
    /**
     * Sort
     * 排序
     * @default: false
     */
    sort?: boolean;
    /**
     * Filter
     * 过滤
     * @default: false
     */
    autoFilter?: boolean;
    /**
     * Use PivotTable reports
     * 使用数据透视表报告
     * @default: false
     */
    pivotTables?: boolean;
    /**
     * Edit objects
     * 修改对象
     * @default: true
     */
    objects?: boolean;
    /**
     * Edit scenarios
     * 修改脚本
     * @default: true
     */
    scenarios?: boolean;
}

/** Page Margins -- see Excel Page Setup .. Margins diagram for explanation */
/** 页边距——参见Excel页面设置。边距图说明 */
export interface MarginInfo {
    /** Left side margin (inches) */
    /** 左边距(英寸) */
    left?: number;
    /** Right side margin (inches) */
    /** 右边距（英寸） */
    right?: number;
    /** Top side margin (inches) */
    /** 上边距 (inches) */
    top?: number;
    /** Bottom side margin (inches) */
    /** 下边距 (inches) */
    bottom?: number;
    /** Header top margin (inches) */
    /** 页头距离顶部 (inches) */
    header?: number;
    /** 页脚底部的高度 (inches) */
    footer?: number;
}
export type SheetType = 'sheet' | 'chart';
export type SheetKeys = string | MarginInfo | SheetType;
/** General object representing a Sheet (worksheet or chartsheet) */
/** 工作表(工作表或图表)的通用对象 */
export interface Sheet {
    /**
     * Indexing with a cell address string maps to a cell object
     * 使用单元地址字符串进行索引映射到单元对象
     * Special keys start with '!'
     * 特殊key以“!”开头
     */
    [cell: string]: CellObject | SheetKeys | any;

    /** Sheet type */
    /** 工作表类型 */
    '!type'?: SheetType;

    /** Sheet Range */
    /** 工作表范围 */
    '!ref'?: string;

    /** Page Margins */
    /** 页边距 */
    '!margins'?: MarginInfo;
}

/** AutoFilter properties */
/** 自动筛选属性 */
export interface AutoFilterInfo {
    /** Range of the AutoFilter table */
    /** 自动筛选表格的范围 */
    ref: string;
}

export type WSKeys = SheetKeys | ColInfo[] | RowInfo[] | Range[] | ProtectInfo | AutoFilterInfo;

/** Worksheet Object */
/** 工作表对象 */
export interface WorkSheet extends Sheet {
    /**
     * Indexing with a cell address string maps to a cell object
     * 使用单元地址字符串进行索引映射到单元对象
     * Special keys start with '!'
     * 特殊key以“!”开头
     */
    [cell: string]: CellObject | WSKeys | any;

    /** Column Info */
    /** 列信息 */
    '!cols'?: ColInfo[];

    /** Row Info */
    /** 行信息 */
    '!rows'?: RowInfo[];

    /** Merge Ranges */
    /** 合并单元格 */
    '!merges'?: Range[];

    /** Worksheet Protection info */
    /** 工作表保护信息 */
    '!protect'?: ProtectInfo;

    /** AutoFilter info */
    /** 自动过滤信息 */
    '!autofilter'?: AutoFilterInfo;
}

/**
 * Worksheet Object with CellObject type
 * 单元格对象类型的工作表对象
 *
 * The normal Worksheet type uses indexer of type `any` -- this enforces CellObject
 * 正常的工作表类型使用“any”类型的索引器——这强制CellObject
 */
export interface StrictWS { [addr: string]: CellObject; }

/**
 * The Excel data type for a cell.
 * 单元格的Excel数据类型
 * b Boolean, n Number, e error, s String, d Date, z Stub
 * b 布尔，n 数字，e 错误，s 字符串，d 日期，z 存根
 */
export type ExcelDataType = 'b' | 'n' | 'e' | 's' | 'd' | 'z';

/**
 * Type of generated workbook
 * 生成的工作簿的类型
 * @default 'xlsx'
 */
export type BookType = 'xlsx' | 'xlsm' | 'xlsb' | 'xls' | 'xla' | 'biff8' | 'biff5' | 'biff2' | 'xlml' | 'ods' | 'fods' | 'csv' | 'txt' | 'sylk' | 'html' | 'dif' | 'rtf' | 'prn' | 'eth';

/** Comment element */
/** 批注 */
export interface Comment {
    /** Author of the comment block */
    /** 批注人 */
    a?: string;

    /** Plaintext of the comment */
    /** 批注明文 */
    t: string;
}

/** Cell comments */
/** 单元格批注 */
export interface Comments extends Array<Comment> {
    /** Hide comment by default */
    /** 默认隐藏批注 */
    hidden?: boolean;
}

/** Link object */
/** 链接对象 */
export interface Hyperlink {
    /** Target of the link (HREF) */
    /** 连结的目标(HREF) */
    Target: string;

    /** Plaintext tooltip to display when mouse is over cell */
    /** 当鼠标在单元格上时显示的纯文本工具提示 */
    Tooltip?: string;
}

/** Worksheet Cell Object */
/** 工作表单元格对象 */
export interface CellObject {
    /** The raw value of the cell.  Can be omitted if a formula is specified */
    /** 单元格的原始值。如果指定了一个公式，是否可以省略 */
    v?: string | number | boolean | Date;

    /** Formatted text (if applicable) */
    /** 格式化文本(如果可用) */
    w?: string;

    /**
     * The Excel Data Type of the cell.
     * 单元格的数据类型（excel）.
     * b Boolean, n Number, e Error, s String, d Date, z Empty
     * b 布尔，n 数字，e 错误，s 字符串，d 日期，z 空
     */
    t: ExcelDataType;

    /** Cell formula (if applicable) */
    /** 单元格公式(如果可用) */
    f?: string;

    /** Range of enclosing array if formula is array formula (if applicable) */
    /** 若公式为数组公式(如果可用)，则包围数组的范围 */
    F?: string;

    /** Rich text encoding (if applicable) */
    /** 富文本编码(如果可用) */
    r?: any;

    /** HTML rendering of the rich text (if applicable) */
    /** 富文本的HTML呈现 (如果可用) */
    h?: string;

    /** Comments associated with the cell */
    /** 单元格批注 */
    c?: Comments;

    /** Number format string associated with the cell (if requested) */
    /** 与单元格关联的数字格式字符串(如果要求) */
    z?: NumberFormat;

    /** Cell hyperlink object (.Target holds link, .tooltip is tooltip) */
    /** 单元格超链接对象 (.Target holds link, .tooltip is tooltip) */
    l?: Hyperlink;

    /** The style/theme of the cell (if applicable) */
    /** 单元格的样式/主题(如果可用) */
    s?: any;
}

/** Simple Cell Address */
/** 单元地址 */
export interface CellAddress {
    /** Column number */
    /** 列序号 */
    c: number;
    /** 行序号 */
    r: number;
}

/** Range object (representing ranges like "A1:B2") */
/** 范围对象 (表示像 "A1:B2" 这样的范围) */
export interface Range {
    /** Starting cell */
    /** 起始的单元格 */
    s: CellAddress;
    /** Ending cell */
    /** 结束的单元格 */
    e: CellAddress;
}

export interface Sheet2CSVOpts extends DateNFOption {
    /** Field Separator ("delimiter") */
    /** 字段分隔符(“分隔符”) */
    FS?: string;

    /** Record Separator ("row separator") */
    /** 记录分隔符(“行分隔符”) */
    RS?: string;

    /** Remove trailing field separators in each record */
    /** 删除每个记录中的尾随字段分隔符 */
    strip?: boolean;

    /** Include blank lines in the CSV output */
    /** 在CSV输出中包含空白行 */
    blankrows?: boolean;

    /** Skip hidden rows and columns in the CSV output */
    /** 跳过CSV输出中的隐藏行和列 */
    skipHidden?: boolean;

    /** Force quotes around fields */
    /** TODO:强制字段加上引号 */
    forceQuotes?: boolean;

    /** if true, return raw numbers; if false, return formatted numbers */
    /** 如果为真，返回原始数字;如果为假，返回格式化的数字 */
    rawNumbers?: boolean;
}

export interface OriginOption {
    /** Top-Left cell for operation (CellAddress or A1 string or row) */
    /** 用于操作的左上角单元格(单元格地址 或 A1字符串 或 行) */
    origin?: number | string | CellAddress;
}

export interface Sheet2HTMLOpts {
    /** TABLE element id attribute */
    /** 标元素id属性 */
    id?: string;

    /** Add contenteditable to every cell */
    /** 向每个单元格添加内容编辑表 */
    editable?: boolean;

    /** Header HTML */
    /** 头部html */
    header?: string;

    /** 尾部html */
    footer?: string;
}

export interface Sheet2JSONOpts extends DateNFOption {
    /** Output format */
    /** 输出格式 */
    header?: "A"|number|string[];

    /** Override worksheet range */
    /** 重写工作表范围 */
    range?: any;

    /** Include or omit blank lines in the output */
    /** 在输出中包含或省略空行 */
    blankrows?: boolean;

    /** Default value for null/undefined values */
    /** 【null 和 undefined】默认值 */
    defval?: any;

    /** if true, return raw data; if false, return formatted text */
    /** 如果为真，返回原始数据;如果为假，则返回格式化文本 */
    raw?: boolean;

    /** if true, return raw numbers; if false, return formatted numbers */
    /** 如果为真，返回原始数字; 如果为假，返回格式化的数字 */
    rawNumbers?: boolean;
}

export interface AOA2SheetOpts extends CommonOptions, DateNFOption {
    /**
     * Create cell objects for stub cells
     * 为存根单元格创建单元格对象
     * @default false   
     */
    sheetStubs?: boolean;
}

export interface SheetAOAOpts extends AOA2SheetOpts, OriginOption {}

export interface JSON2SheetOpts extends CommonOptions, DateNFOption {
    /** Use specified column order */
    /** 使用指定的列顺序 */
    header?: string[];

    /** Skip header row in generated sheet */
    /** 跳过生成的工作表中的标题行 */
    skipHeader?: boolean;
}

export interface SheetJSONOpts extends JSON2SheetOpts, OriginOption {}

export interface Table2SheetOpts extends CommonOptions, DateNFOption {
    /** If true, plaintext parsing will not parse values */
    /** 如果为真，纯文本解析将无法解析值 */
    raw?: boolean;

    /**
     * If >0, read the first sheetRows rows
     * 如果>0，读取第一个sheetRows行
     * @default 0
     */
    sheetRows?: number;

    /** If true, hidden rows and cells will not be parsed */
    /** 如果为真，则不会解析隐藏的行和单元格 */
    display?: boolean;
}

/** General utilities */
/** 通用工具 */
export interface XLSX$Utils {
    /* --- Import Functions --- */

    /** Converts an array of arrays of JS data to a worksheet. */
    /** 将一组数组转换为一个工作表. */
    aoa_to_sheet<T>(data: T[][], opts?: AOA2SheetOpts): WorkSheet;
    aoa_to_sheet(data: any[][], opts?: AOA2SheetOpts): WorkSheet;

    /** Converts an array of JS objects to a worksheet. */
    /** 将JSON换为工作表. */
    json_to_sheet<T>(data: T[], opts?: JSON2SheetOpts): WorkSheet;
    json_to_sheet(data: any[], opts?: JSON2SheetOpts): WorkSheet;

    /** BROWSER ONLY! Converts a TABLE DOM element to a worksheet. */
    /** 将表DOM元素转换为工作表. */
    table_to_sheet(data: any,  opts?: Table2SheetOpts): WorkSheet;
    table_to_book(data: any,  opts?: Table2SheetOpts): WorkBook;
    sheet_add_dom(ws: WorkSheet, data: any, opts?: Table2SheetOpts): WorkSheet;

    /* --- Export Functions --- */

    /** Converts a worksheet object to an array of JSON objects */
    /** 将工作表对象转换为JSON对象数组 */
    sheet_to_json<T>(worksheet: WorkSheet, opts?: Sheet2JSONOpts): T[];
    sheet_to_json(worksheet: WorkSheet, opts?: Sheet2JSONOpts): any[][];
    sheet_to_json(worksheet: WorkSheet, opts?: Sheet2JSONOpts): any[];

    /** Generates delimiter-separated-values output */
    /** 生成 分隔符分隔值 输出 */
    sheet_to_csv(worksheet: WorkSheet, options?: Sheet2CSVOpts): string;

    /** Generates UTF16 Formatted Text */
    /** 生成UTF16格式的文本 */
    sheet_to_txt(worksheet: WorkSheet, options?: Sheet2CSVOpts): string;

    /** Generates HTML */
    /** 生成 HTML */
    sheet_to_html(worksheet: WorkSheet, options?: Sheet2HTMLOpts): string;

    /** Generates a list of the formulae (with value fallbacks) */
    /** 生成一个公式列表(带有值回退) */
    sheet_to_formulae(worksheet: WorkSheet): string[];

    /** Generates DIF */
    /** 生成 DIF */
    sheet_to_dif(worksheet: WorkSheet, options?: Sheet2HTMLOpts): string;

    /** Generates SYLK (Symbolic Link) */
    /** 生成 SYLK (Symbolic Link) */
    sheet_to_slk(worksheet: WorkSheet, options?: Sheet2HTMLOpts): string;

    /** Generates ETH */
    /** 生成 ETH */
    sheet_to_eth(worksheet: WorkSheet, options?: Sheet2HTMLOpts): string;

    /* --- Cell Address Utilities --- */
    /* --- 单元格地址工具 --- */

    /** Converts 0-indexed cell address to A1 form */
    /** 将0索引的单元地址转换为A1形式  [A1] */
    encode_cell(cell: CellAddress): string;

    /** Converts 0-indexed row to A1 form */
    /** 将0索引的行转换为A1形式 [1] */
    encode_row(row: number): string;

    /** Converts 0-indexed column to A1 form */
    /** 将0索引列转换为A1形式  [A] */
    encode_col(col: number): string;

    /** Converts 0-indexed range to A1 form */
    /** 将0索引的范围转换为A1形式 */
    encode_range(s: CellAddress, e: CellAddress): string;
    encode_range(r: Range): string;

    /** Converts A1 cell address to 0-indexed form */
    /** 将A1单元地址转换为0索引形式 */
    decode_cell(address: string): CellAddress;

    /** Converts A1 row to 0-indexed form */
    /** 将A1行转换为0索引的形式 */
    decode_row(row: string): number;

    /** Converts A1 column to 0-indexed form */
    /** 将A1列转换为0索引的形式 */
    decode_col(col: string): number;

    /** Converts A1 range to 0-indexed form */
    /** 将A1范围转换为0索引的形式 */
    decode_range(range: string): Range;

    /** Format cell */
    /** 单元格格式 */
    format_cell(cell: CellObject, v?: any, opts?: any): string;

    /* --- General Utilities --- */

    /** Creates a new workbook */
    /** 创建一个新的工作簿 */
    book_new(): WorkBook;

    /** Append a worksheet to a workbook */
    /** 将工作表追加到工作簿 */
    book_append_sheet(workbook: WorkBook, worksheet: WorkSheet, name?: string): void;

    /** Set sheet visibility (visible/hidden/very hidden) */
    /** 设置工作表可见性(可见/隐藏/非常隐藏) */
    book_set_sheet_visibility(workbook: WorkBook, sheet: number|string, visibility: number): void;

    /** Set number format for a cell */
    /** 为单元格设置数字格式 */
    cell_set_number_format(cell: CellObject, fmt: string|number): CellObject;

    /** Set hyperlink for a cell */
    /** 为单元格设置超链接 */
    cell_set_hyperlink(cell: CellObject, target: string, tooltip?: string): CellObject;

    /** Set internal link for a cell */
    /** 为单元格设置内链 */
    cell_set_internal_link(cell: CellObject, target: string, tooltip?: string): CellObject;

    /** Add comment to a cell */
    /** 对单元格添加批注 */
    cell_add_comment(cell: CellObject, text: string, author?: string): void;

    /** Assign an Array Formula to a range */
    /** 将数组公式分配到一个范围 */
    sheet_set_array_formula(ws: WorkSheet, range: Range|string, formula: string): WorkSheet;

    /** Add an array of arrays of JS data to a worksheet */
    /** 向工作表中添加一组数组（array） */
    sheet_add_aoa<T>(ws: WorkSheet, data: T[][], opts?: SheetAOAOpts): WorkSheet;
    sheet_add_aoa(ws: WorkSheet, data: any[][], opts?: SheetAOAOpts): WorkSheet;

    /** Add an array of JS objects to a worksheet */
    /** 想工作表中添加一个JS对象数组 */
    sheet_add_json(ws: WorkSheet, data: any[], opts?: SheetJSONOpts): WorkSheet;
    sheet_add_json<T>(ws: WorkSheet, data: T[], opts?: SheetJSONOpts): WorkSheet;


    consts: XLSX$Consts;
}

export interface XLSX$Consts {
    /* --- Sheet Visibility --- */

    /** Visibility: Visible */
    /** 可见性: 可见 */
    SHEET_VISIBLE: 0;

    /** 可见性: 隐藏 */
    SHEET_HIDDEN: 1;

    /** TODO:可见性: 非常隐藏 */
    SHEET_VERYHIDDEN: 2;
}

/** NODE ONLY! these return Readable Streams */
/** NODE ONLY! 这些返回可读流 */
export interface StreamUtils {
    /** CSV output stream, generate one line at a time */
    /** CSV输出流，每次生成一行 */
    to_csv(sheet: WorkSheet, opts?: Sheet2CSVOpts): any;
    /** HTML output stream, generate one line at a time */
    /** HTML输出流，每次生成一行 */
    to_html(sheet: WorkSheet, opts?: Sheet2HTMLOpts): any;
    /** JSON object stream, generate one row at a time */
    /** JSON对象流，每次生成一行 */
    to_json(sheet: WorkSheet, opts?: Sheet2JSONOpts): any;
}
