"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Search, Shield, User as UserIcon, Plus, Edit, Trash2 } from "lucide-react";
import UserModal from "./UserModal";
import { 
    PageHeader, 
    TableContainer, 
    THead, 
    TBody, 
    TR, 
    TH, 
    TD, 
    StatusBadge,
    ActionButton,
    SearchInput,
    TableSkeleton,
    Skeleton,
    EmptyState
} from "@/components/dashboard/ui/DataTable";

type User = {
    id: string;
    name: string | null;
    email: string | null;
    role: string;
    image: string | null;
    _count?: {
        posts: number;
    }
};

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        try {
            const res = await fetch("/api/users");
            if (res.ok) {
                const data = await res.json();
                setUsers(data.users || []);
            }
        } catch (e) {
            console.error("Failed to load users", e);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(userId: string) {
        if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

        try {
            const res = await fetch(`/api/users?id=${userId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                fetchUsers();
            } else {
                const data = await res.json();
                alert(data.error || "Failed to delete user");
            }
        } catch (e) {
            alert("Failed to delete user");
        }
    }

    function handleEdit(user: User) {
        setSelectedUser(user);
        setIsModalOpen(true);
    }

    function handleCreate() {
        setSelectedUser(null);
        setIsModalOpen(true);
    }

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full animate-in fade-in duration-700 pb-20 px-4">
            <UserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchUsers}
                initialData={selectedUser}
            />

            <PageHeader 
                title="Users" 
                subtitle="Manage team entities, permissions and operational roles."
            >
                <button
                    onClick={handleCreate}
                    className="px-3 py-1.5 bg-[#2eaadc] text-white rounded text-xs font-bold hover:bg-[#1a99cc] transition-colors"
                >
                    New User
                </button>
            </PageHeader>

            <SearchInput 
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search users..."
            />

            <TableContainer>
                <THead>
                    <TR>
                        <TH>User</TH>
                        <TH>Role</TH>
                        <TH align="center">Posts</TH>
                        <TH align="right">Actions</TH>
                    </TR>
                </THead>
                <TBody>
                    {loading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <TR key={i}>
                                <TD><Skeleton className="h-8 w-8 rounded-full" /></TD>
                                <TD><Skeleton className="h-4 w-32" /></TD>
                                <TD><Skeleton className="h-4 w-16" /></TD>
                                <TD align="center"><Skeleton className="h-4 w-8" /></TD>
                                <TD align="right"><Skeleton className="h-6 w-12" /></TD>
                            </TR>
                        ))
                    ) : filteredUsers.length === 0 ? (
                        <TR>
                            <TD colSpan={4} className="p-0 border-none">
                                <EmptyState 
                                    icon={<Shield size={32} />} 
                                    message="No entities match your current search parameters." 
                                />
                            </TD>
                        </TR>
                    ) : (
                        filteredUsers.map((user) => (
                            <TR key={user.id}>
                                <TD>
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-white mr-3 overflow-hidden border border-[#2f2f2f]">
                                            {user.image ? (
                                                <Image src={user.image} alt={user.name || "User"} fill className="object-cover" />
                                            ) : (
                                                <span className="font-bold text-[10px]">{(user.name?.[0] || user.email?.[0] || "?").toUpperCase()}</span>
                                            )}
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-white tracking-tight">{user.name || "Anonymous User"}</div>
                                            <div className="text-[10px] text-gray-400 mt-0.5">{user.email}</div>
                                        </div>
                                    </div>
                                </TD>
                                <TD>
                                    <StatusBadge 
                                        type={user.role === 'admin' ? "secondary" : user.role === 'editor' ? "info" : "neutral"} 
                                        label={user.role} 
                                    />
                                </TD>
                                <TD align="center" className="text-xs font-medium text-white">
                                    {user._count?.posts || 0}
                                </TD>
                                <TD align="right">
                                    <div className="flex justify-end gap-3 items-center">
                                        <ActionButton onClick={() => handleEdit(user)} title="Edit User">
                                            <Edit size={14} />
                                        </ActionButton>
                                        <ActionButton variant="danger" onClick={() => handleDelete(user.id)} title="Delete User">
                                            <Trash2 size={14} />
                                        </ActionButton>
                                    </div>
                                </TD>
                            </TR>
                        ))
                    )}
                </TBody>
            </TableContainer>
        </div>
    );
}
