import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "./CodeBlock";
import { Callout } from "./Callout";
import { CommandLine } from "./CommandLine";
import { Badge } from "./Badge";
import { MermaidDiagram } from "./MermaidDiagram";

export const MDX_COMPONENTS: MDXComponents = {
  // ── Custom doc components (used directly in .mdx files) ──
  CodeBlock,
  Callout,
  CommandLine,
  Badge,
  MermaidDiagram,

  // ── Prose element overrides ──

  // Headings — add id for TOC anchor linking
  h2: ({ children, ...props }) => {
    const text = String(children ?? "");
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    return (
      <h2
        id={id}
        className="text-2xl font-black mt-16 mb-6 scroll-mt-32 flex items-center gap-3 tracking-tight text-content-primary"
        {...props}
      >
        <span className="w-1 h-6 rounded-full bg-theme-primary" />
        {children}
      </h2>
    );
  },

  h3: ({ children, ...props }) => {
    const text = String(children ?? "");
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    return (
      <h3
        id={id}
        className="text-xl font-extrabold mt-10 mb-4 scroll-mt-32 tracking-tight text-content-primary"
        {...props}
      >
        {children}
      </h3>
    );
  },

  // Paragraph
  p: ({ children }) => (
    <p className="leading-[1.8] mb-6 text-base font-medium text-content-secondary">
      {children}
    </p>
  ),

  // Inline code
  code: ({ children }) => (
    <code
      className="px-2 py-0.5 rounded-lg text-[0.9em] font-mono font-semibold bg-bg-sunken text-theme-primary border border-theme-primary/10"
    >
      {children}
    </code>
  ),

  // Fenced code block — pre wraps code
  pre: ({ children }) => {
    // children is a <code> element; extract text and language
    const codeEl = children as React.ReactElement<{ className?: string; children?: string }>;
    const lang = codeEl?.props?.className?.replace("language-", "") ?? undefined;
    const code = codeEl?.props?.children ?? "";

    // Handle mermaid diagrams specially
    if (lang === "mermaid") {
      return <MermaidDiagram chart={code} />;
    }

    return <CodeBlock language={lang}>{code}</CodeBlock>;
  },

  // Blockquote → Callout note
  blockquote: ({ children }) => <Callout type="note">{children}</Callout>,

  // Unordered list
  ul: ({ children }) => (
    <ul className="list-none space-y-3 mb-8 pl-1 text-content-secondary">
      {children}
    </ul>
  ),

  // Ordered list
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-3 mb-8 pl-1 font-medium text-content-secondary">
      {children}
    </ol>
  ),

  li: ({ children }) => (
    <li className="leading-relaxed flex items-start gap-2.5">
      <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-theme-primary/30 flex-shrink-0" />
      <span className="flex-1 font-medium text-content-primary">{children}</span>
    </li>
  ),

  // Horizontal rule
  hr: () => (
    <hr className="my-12 border-t border-theme-border/50" />
  ),

  // Links
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-bold underline decoration-2 underline-offset-4 decoration-theme-primary/30 hover:decoration-theme-primary transition-all text-theme-primary"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),

  // Strong
  strong: ({ children }) => (
    <strong className="font-extrabold text-content-primary">
      {children}
    </strong>
  ),

  // Tables
  table: ({ children }) => (
    <div className="my-10 w-full overflow-hidden rounded-3xl border border-theme-border/40 shadow-neu-raised bg-bg-elevated relative z-10">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-[14px]">
          {children}
        </table>
      </div>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-bg-sunken border-b border-theme-border/40">
      {children}
    </thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-theme-border/20">
      {children}
    </tbody>
  ),
  tr: ({ children }) => (
    <tr className="group hover:bg-theme-primary/[0.02] transition-colors">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="px-8 py-5 font-black uppercase tracking-[0.1em] text-[10.5px] text-content-secondary">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-8 py-5 text-content-primary font-medium leading-relaxed">
      {children}
    </td>
  ),
};
