import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskTable } from "@/components/tracker/TaskTable";
import { TaskModal } from "@/components/tracker/TaskModal";
import { useMembers, useTasks } from "@/lib/tracker/store";
import type { Task } from "@/lib/tracker/types";
import { AREAS } from "@/lib/tracker/types";
import { endOfWeek, isoDate, startOfWeek } from "@/lib/tracker/date";

export const Route = createFileRoute("/archive")({
  head: () => ({
    meta: [
      { title: "Archive — Founder's Weekly" },
      { name: "description", content: "Past weeks of finished work." },
    ],
  }),
  component: ArchivePage,
});

function getPastWeekStarts(tasks: Task[]): string[] {
  const currentWeek = isoDate(startOfWeek());
  const set = new Set<string>();
  for (const t of tasks) {
    if (t.weekOf < currentWeek) set.add(t.weekOf);
  }
  return Array.from(set).sort((a, b) => b.localeCompare(a));
}

function weekLabel(iso: string): string {
  const d = new Date(iso);
  const e = endOfWeek(d);
  const fmt = (x: Date) =>
    x.toLocaleDateString(undefined, { day: "numeric", month: "short" });
  return `${fmt(d)} – ${fmt(e)}`;
}

function ArchivePage() {
  const tasks = useTasks();
  const members = useMembers();
  const weekStart = isoDate(startOfWeek());

  const archived = useMemo(
    () => tasks.filter((t) => t.weekOf < weekStart && t.status === "done"),
    [tasks, weekStart],
  );

  const weeks = useMemo(() => getPastWeekStarts(archived), [archived]);
  const [week, setWeek] = useState<string>("all");
  const [owner, setOwner] = useState<string>("all");
  const [area, setArea] = useState<string>("all");

  const [editing, setEditing] = useState<Task | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = archived.filter((t) => {
    if (week !== "all" && t.weekOf !== week) return false;
    if (owner !== "all" && t.owner !== owner) return false;
    if (area !== "all" && t.area !== area) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          History
        </p>
        <h1 className="mt-1 font-serif text-5xl text-aurora md:text-6xl">Archive</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Tasks marked Done in past weeks. Unfinished work auto-carries to this week.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        <Select value={week} onValueChange={setWeek}>
          <SelectTrigger className="w-[200px] glass border-white/10">
            <SelectValue placeholder="Week" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All weeks</SelectItem>
            {weeks.map((w) => (
              <SelectItem key={w} value={w}>
                {weekLabel(w)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={owner} onValueChange={setOwner}>
          <SelectTrigger className="w-[180px] glass border-white/10">
            <SelectValue placeholder="Owner" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All owners</SelectItem>
            {members.map((m) => (
              <SelectItem key={m.id} value={m.id}>
                {m.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={area} onValueChange={setArea}>
          <SelectTrigger className="w-[160px] glass border-white/10">
            <SelectValue placeholder="Area" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All areas</SelectItem>
            {AREAS.map((a) => (
              <SelectItem key={a} value={a}>
                {a}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      <TaskTable
        tasks={filtered}
        members={members}
        onRowClick={(t) => {
          setEditing(t);
          setOpen(true);
        }}
      />

      <TaskModal open={open} onOpenChange={setOpen} task={editing} members={members} />
    </div>
  );
}
