"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { TopBar } from "@/components/TopBar";
import { cn } from "@/lib/cn";
import { loadChat, saveChat } from "@/lib/storage";
import type { ChatMessage } from "@/lib/types";

function cannedReply(input: string) {
  const text = input.toLowerCase();

  if (text.includes("bench") || text.includes("press")) {
    return "For pressing, keep your shoulder blades tucked and use a controlled 2–3s eccentric. Add 2.5kg only once you can hit all sets with 1–2 reps in reserve.";
  }

  if (text.includes("squat")) {
    return "For squats, aim for consistent depth and a strong brace. Add a pause on your first rep each set to tighten positioning, then progress load slowly week to week.";
  }

  if (text.includes("cut") || text.includes("lose")) {
    return "For fat loss, keep protein high and track steps. Lift 3–4x/week with progressive overload, and use cardio as a supplement, not the foundation.";
  }

  return "Good plan: focus on one key lift to progress weekly, keep 1–2 reps in reserve on most sets, and prioritize sleep + protein. Want to share your last workout?";
}

export default function CoachPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const existing = loadChat();
    if (existing.length) return existing;

    return [
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Ask me about training, recovery, or your workout plan. This is a mock coach until we connect OpenAI.",
        createdAt: new Date().toISOString(),
      },
    ];
  });
  const [draft, setDraft] = useState("");
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!messages.length) return;
    saveChat(messages);
    scrollerRef.current?.scrollTo({
      top: scrollerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const canSend = useMemo(() => draft.trim().length > 0, [draft]);

  function send() {
    if (!canSend) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: draft.trim(),
      createdAt: new Date().toISOString(),
    };

    setDraft("");

    const reply: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: cannedReply(userMsg.content),
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg, reply]);
  }

  function clear() {
    const next: ChatMessage[] = [
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Fresh start. Tell me your goal (lose fat, build muscle, or performance).",
        createdAt: new Date().toISOString(),
      },
    ];
    setMessages(next);
  }

  return (
    <div className="min-h-dvh">
      <TopBar
        title="AI Coach"
        right={
          <button
            type="button"
            onClick={clear}
            className="rounded-xl border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-200 dark:hover:bg-white/5"
          >
            Clear
          </button>
        }
      />

      <main className="flex min-h-[calc(100dvh-3.5rem-5rem)] flex-col md:min-h-[calc(100dvh-4rem)] md:px-6 md:pt-8">
        <div className="mb-4 hidden items-center justify-between md:flex">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">AI Coach</h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Mock coaching chat (until OpenAI is wired).
            </p>
          </div>
          <button
            type="button"
            onClick={clear}
            className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-200 dark:hover:bg-white/5"
          >
            Clear
          </button>
        </div>

        <div ref={scrollerRef} className="flex-1 space-y-3 overflow-auto px-4 pt-4">
          {messages.map((m) => {
            const isUser = m.role === "user";
            return (
              <div
                key={m.id}
                className={cn(
                  "flex",
                  isUser ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-3xl px-4 py-3 text-sm shadow-sm",
                    isUser
                      ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                      : "border border-zinc-200/70 bg-white text-zinc-900 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-50"
                  )}
                >
                  {m.content}
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-zinc-200/70 bg-white/80 px-4 py-3 backdrop-blur dark:border-white/10 dark:bg-black/70 md:rounded-3xl md:border md:border-zinc-200/70 md:bg-white md:dark:border-white/10 md:dark:bg-zinc-950">
          <div className="flex items-end gap-2">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={1}
              placeholder="Ask something..."
              className="max-h-28 min-h-[44px] flex-1 resize-none rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400 dark:border-white/10 dark:bg-black"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
            />
            <button
              type="button"
              disabled={!canSend}
              onClick={send}
              className="h-[44px] rounded-2xl bg-zinc-950 px-4 text-sm font-medium text-white disabled:opacity-50 dark:bg-white dark:text-zinc-950"
            >
              Send
            </button>
          </div>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            Mock coach for now. Later we’ll connect OpenAI.
          </p>
        </div>
      </main>
    </div>
  );
}
