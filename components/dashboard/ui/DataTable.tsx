"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import Link from "next/link";

/**
 * PageHeader
 * Standardizes the title, description, and action button layout at the top of dashboard pages.
 */
export function PageHeader({ 
    title, 
    subtitle, 
    children 
    }: { 
    title: string; 
    subtitle?: string; 
    children?: React.ReactNode 
    }) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-white/5">
            <div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight">{title}</h1>
                {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
            </div>
            {children && (
                <div className="flex items-center gap-3">
                    {children}
                </div>
            )}
        </div>
    );
}

/**
 * DataTable System
 * A set of components that enforce consistent styling for data-heavy views.
 */
export function TableContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-[#202020] rounded-xl border border-[#2f2f2f] overflow-hidden w-full transition-all">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[#2f2f2f]">
                    {children}
                </table>
            </div>
        </div>
    );
}

export function THead({ children }: { children: React.ReactNode }) {
    return <thead className="bg-white/[0.02]">{children}</thead>;
}

export function TBody({ children }: { children: React.ReactNode }) {
    return <tbody className="divide-y divide-[#2f2f2f]">{children}</tbody>;
}

export function TR({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return <tr className={`hover:bg-white/[0.01] transition-colors group ${className}`}>{children}</tr>;
}

export function TH({ 
    children, 
    align = "left" 
}: { 
    children: React.ReactNode; 
    align?: "left" | "center" | "right" 
}) {
    const alignClass = align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left";
    return (
        <th className={`px-4 py-3 ${alignClass} text-[11px] font-medium text-white uppercase tracking-widest`}>
            {children}
        </th>
    );
}

export function TD({ 
    children, 
    align = "left",
    className = "",
    colSpan
}: { 
    children: React.ReactNode; 
    align?: "left" | "center" | "right";
    className?: string;
    colSpan?: number;
}) {
    const alignClass = align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left";
    return (
        <td colSpan={colSpan} className={`px-4 py-3 whitespace-nowrap ${alignClass} ${className}`}>
            {children}
        </td>
    );
}

/**
 * StatusBadge
 * Unified badge for various status types across the dashboard.
 */
export function StatusBadge({ 
    type, 
    label 
}: { 
    type: "success" | "warning" | "error" | "info" | "neutral" | "primary" | "secondary";
    label: string | React.ReactNode;
}) {
    const variants = {
        success: "bg-emerald-500/5 text-emerald-500 border-emerald-500/10",
        warning: "bg-amber-500/5 text-amber-500 border-amber-500/10",
        error: "bg-red-500/5 text-red-500 border-red-500/10",
        info: "bg-blue-500/5 text-blue-400 border-blue-500/10",
        primary: "bg-[#2eaadc]/5 text-[#2eaadc] border-[#2eaadc]/10",
        secondary: "bg-purple-500/5 text-purple-400 border-purple-500/10",
        neutral: "bg-white/5 text-white border-[#2f2f2f]",
    };

    return (
        <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest border ${variants[type]}`}>
            {label}
        </span>
    );
}

/**
 * SearchInput
 * A standardized search field with a search icon and consistent styling.
 */
export function SearchInput({ 
    value, 
    onChange, 
    placeholder = "Search..." 
}: { 
    value: string; 
    onChange: (val: string) => void; 
    placeholder?: string;
}) {
    return (
        <div className="relative mb-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#373838]" size={14} />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-white/5 border border-[#2f2f2f] rounded-lg text-sm text-white outline-none focus:border-gray-500 transition-colors"
            />
        </div>
    );
}

/**
 * CustomSelect
 * A premium, OS-independent dropdown component.
 */
export function CustomSelect({ 
    options, 
    value, 
    onChange, 
    placeholder = "Select...",
    className = "",
    variant = "default"
}: { 
    options: { label: string | React.ReactNode; value: string }[]; 
    value: string; 
    onChange: (val: string) => void;
    placeholder?: string;
    className?: string;
    variant?: "default" | "primary";
}) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value);

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleSelect = (val: string) => {
        onChange(val);
        setIsOpen(false);
    };

    const colorClass = variant === "primary" ? "text-[#2eaadc]" : "text-white";

    return (
        <div ref={containerRef} className={`relative min-w-[140px] ${className}`}>
            <button
                type="button"
                onClick={toggleOpen}
                className={`w-full flex items-center justify-between px-3 py-1.5 bg-white/5 border border-[#2f2f2f] rounded-lg text-xs outline-none transition-all hover:bg-white/10 ${isOpen ? 'border-gray-500' : ''} ${colorClass}`}
            >
                <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
                <ChevronDown size={14} className={`ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute z-[100] mt-1 w-full bg-[#191919] border border-[#2f2f2f] rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 max-h-60 overflow-y-auto custom-scrollbar">
                    {options.length === 0 ? (
                        <div className="px-3 py-2 text-[10px] text-gray-500 italic">No options available</div>
                    ) : (
                        options.map((opt) => (
                            <div
                                key={opt.value}
                                onClick={() => handleSelect(opt.value)}
                                className={`flex items-center justify-between px-3 py-2 text-xs cursor-pointer transition-colors ${value === opt.value ? 'bg-[#2eaadc]/10 text-[#2eaadc]' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                            >
                                <span className={value === opt.value ? "font-bold" : ""}>{opt.label}</span>
                                {value === opt.value && <Check size={12} />}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

/**
 * ActionButton
 * Consistent buttons for row actions like Edit or Delete.
 */
export function ActionButton({ 
    children,
    onClick, 
    title, 
    variant = "default" 
}: { 
    children: React.ReactNode; 
    onClick?: () => void; 
    title?: string;
    variant?: "default" | "danger";
}) {
    const variantClass = variant === "danger" ? "hover:text-red-500" : "hover:text-white";
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                onClick?.();
            }}
            className={`p-1 text-white transition-colors ${variantClass}`}
            title={title}
        >
            {children}
        </button>
    );
}


/**
 * Skeleton Components
 * Standardized loading states with shimmer effects.
 */
export function Skeleton({ className = "" }: { className?: string }) {
    return (
        <div className={`bg-white/[0.05] rounded animate-shimmer ${className}`} />
    );
}

export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
    return (
        <TableContainer>
            <THead>
                <TR>
                    {Array.from({ length: cols }).map((_, i) => (
                        <TH key={i}><Skeleton className="h-2 w-16" /></TH>
                    ))}
                </TR>
            </THead>
            <TBody>
                {Array.from({ length: rows }).map((_, i) => (
                    <TR key={i}>
                        {Array.from({ length: cols }).map((_, j) => (
                            <TD key={j}><Skeleton className="h-3 w-full max-w-[120px]" /></TD>
                        ))}
                    </TR>
                ))}
            </TBody>
        </TableContainer>
    );
}

export function CardSkeleton() {
    return (
        <div className="bg-[#202020] rounded border border-[#2f2f2f] overflow-hidden p-3 space-y-3">
            <Skeleton className="aspect-square w-full rounded" />
            <div className="space-y-2">
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-2 w-1/2" />
            </div>
        </div>
    );
}

/**
 * FormSection
 * Standardized container for form groups with a title and optional description.
 */
export function FormSection({ 
    title, 
    description, 
    children 
}: { 
    title: string; 
    description?: string; 
    children: React.ReactNode 
}) {
    return (
        <div className="bg-[#202020] rounded-xl border border-[#2f2f2f] overflow-hidden">
            <div className="p-5 space-y-4">
                <div>
                    <h2 className="text-base font-bold text-white tracking-tight">{title}</h2>
                    {description && <p className="text-white text-xs">{description}</p>}
                </div>
                <div className="space-y-4">
                    {children}
                </div>
            </div>
        </div>
    );
}

/**
 * FormInput
 * Labeled input field with consistent dashboard styling.
 */
export function FormInput({ 
    label, 
    name, 
    value, 
    onChange, 
    placeholder, 
    type = "text",
    required = false,
    className = ""
}: { 
    label: string; 
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    required?: boolean;
    className?: string;
}) {
    return (
        <div className={`space-y-1.5 ${className}`}>
            <label className="text-[10px] font-bold text-white uppercase tracking-widest pl-0.5">{label}</label>
            <input
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full px-2.5 py-1.5 bg-white/5 border border-[#2f2f2f] rounded-lg text-sm text-white outline-none focus:border-gray-500 transition-all placeholder:text-gray-700"
            />
        </div>
    );
}

/**
 * FormSelect
 * Labeled select field with custom styling.
 */
export function FormSelect({ 
    label, 
    name, 
    value, 
    onChange, 
    options,
    className = ""
}: { 
    label: string; 
    name?: string;
    value?: string;
    onChange?: (val: any) => void;
    options: { label: string; value: string }[];
    className?: string;
}) {
    return (
        <div className={`space-y-1.5 ${className}`}>
            <label className="text-[10px] font-bold text-white uppercase tracking-widest pl-0.5">{label}</label>
            <CustomSelect
                options={options}
                value={value || ""}
                onChange={(val) => {
                    if (onChange) {
                        onChange({ target: { name, value: val } } as any);
                    }
                }}
                className="w-full"
            />
        </div>
    );
}

/**
 * FormTextArea
 * Labeled textarea for multi-line content.
 */
export function FormTextArea({ 
    label, 
    name, 
    value, 
    onChange, 
    placeholder, 
    rows = 3,
    className = ""
}: { 
    label: string; 
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    rows?: number;
    className?: string;
}) {
    return (
        <div className={`space-y-1.5 ${className}`}>
            <label className="text-[10px] font-bold text-white uppercase tracking-widest pl-0.5">{label}</label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className="w-full px-2.5 py-1.5 bg-white/5 border border-[#2f2f2f] rounded-lg text-sm text-white outline-none focus:border-gray-500 transition-all placeholder:text-gray-700 resize-none"
            />
        </div>
    );
}

/**
 * StatCard
 * Metric display card for home page or analytics.
 */
export function StatCard({ 
    title, 
    value, 
    icon,
    description
}: { 
    title: string; 
    value: string | number; 
    icon?: React.ReactNode;
    description?: string;
}) {
    return (
        <div className="relative overflow-hidden bg-[#202020] p-5 rounded-xl border border-[#2f2f2f] hover:border-[#2eaadc]/30 transition-all group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#2eaadc]/5 rounded-full -translate-y-12 translate-x-12 blur-3xl group-hover:bg-[#2eaadc]/10 transition-all" />
            <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{title}</span>
                {icon && <div className="text-[#2eaadc]">{icon}</div>}
            </div>
            <h4 className="text-2xl font-black text-white tracking-tighter mb-1">{value}</h4>
            {description && <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">{description}</p>}
        </div>
    );
}

/**
 * QuickAction
 * Compact action items for navigations.
 */
export function QuickAction({ 
    href, 
    label, 
    icon 
}: { 
    href: string; 
    label: string; 
    icon?: React.ReactNode 
}) {
    return (
        <Link href={href} className="flex items-center justify-center gap-2 p-2 bg-[#202020] border border-[#2f2f2f] rounded text-[11px] font-bold text-white hover:border-gray-700 transition-all">
            {icon} {label}
        </Link>
    );
}

/**
 * LibraryItem
 * Asset summary rows with counts.
 */
export function LibraryItem({ 
    label, 
    value, 
    icon, 
    href 
}: { 
    label: string; 
    value: number | string; 
    icon?: React.ReactNode; 
    href: string 
}) {
    return (
        <Link href={href} className="flex items-center justify-between p-2.5 hover:bg-white/[0.02] transition-colors group">
            <div className="flex items-center gap-3">
                <div className="text-white opacity-50 group-hover:opacity-100 transition-opacity">{icon}</div>
                <span className="text-xs font-medium text-white group-hover:text-white">{label}</span>
            </div>
            <span className="text-[10px] font-bold text-gray-700">{value}</span>
        </Link>
    );
}

/**
 * EmptyState
 * Standard view for results with no data.
 */
export function EmptyState({ 
    icon, 
    message = "No data available in this section.",
    className = ""
}: { 
    icon?: React.ReactNode; 
    message?: string;
    className?: string;
}) {
    return (
        <div className={`bg-[#202020] py-10 rounded-xl border border-[#2f2f2f] text-center w-full ${className}`}>
            {icon && <div className="mx-auto mb-4 text-gray-800 flex justify-center">{icon}</div>}
            <p className="text-white text-xs font-medium italic opacity-60 tracking-tight">{message}</p>
        </div>
    );
}
