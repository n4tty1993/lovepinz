"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ThumbsUp,
  X,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
} from "lucide-react";
import { fadeUpVariants } from "@/constants/animations";
import {
  REVIEWS,
  RATING_DISTRIBUTION,
  MOCK_IMAGES,
  HIGHLIGHT_TAGS,
  AVATAR_HUES,
  SORT_OPTIONS,
  FILTER_OPTIONS,
} from "./ReviewSection.constants";
import type {
  Review,
  SortOption,
  FilterOption,
  MockImage,
} from "./ReviewSection.types";

function getAvatarColors(seed: number) {
  const h = AVATAR_HUES[seed % AVATAR_HUES.length];
  return { bg: `hsl(${h},50%,88%)`, fg: `hsl(${h},40%,30%)` };
}

function Stars({ count, size = 14 }: { count: number; size?: number }) {
  return (
    <span
      className="inline-flex gap-0.5"
      role="img"
      aria-label={`${count} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill={i <= count ? "#f0bf60" : "#e5e7eb"}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

function ZoomModal({
  images,
  initialIndex,
  reviewer,
  onClose,
}: {
  images: MockImage[];
  initialIndex: number;
  reviewer: string;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(initialIndex);
  const n = images.length;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % n);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + n) % n);
    },
    [n, onClose],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/65 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[480px] overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3">
          <span className="text-xs text-[var(--brand-muted)]">
            Photo by{" "}
            <strong className="text-[var(--brand-text)]">{reviewer}</strong>
            {n > 1 && (
              <>
                {" "}
                &middot; {idx + 1}/{n}
              </>
            )}
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100"
          >
            <X size={16} />
          </button>
        </div>

        {/* Image area */}
        <div
          className="relative flex h-[300px] items-center justify-center"
          style={{ background: images[idx].bg }}
        >
          <ImageIcon size={64} color={images[idx].stroke} />
          {n > 1 && (
            <>
              <button
                onClick={() => setIdx((i) => (i - 1 + n) % n)}
                aria-label="Previous"
                className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 shadow-sm hover:bg-white"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setIdx((i) => (i + 1) % n)}
                aria-label="Next"
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 shadow-sm hover:bg-white"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {n > 1 && (
          <div className="flex justify-center gap-2 border-t border-gray-200 p-3">
            {images.map((im, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Image ${i + 1}`}
                className="flex h-12 w-12 items-center justify-center rounded-[10px]"
                style={{
                  background: im.bg,
                  border: `2px solid ${i === idx ? "#2a7a6f" : "#e5e7eb"}`,
                }}
              >
                <ImageIcon size={18} color={im.stroke} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ReviewCard({
  review,
  onZoom,
}: {
  review: Review;
  onZoom: (data: {
    images: MockImage[];
    index: number;
    reviewer: string;
  }) => void;
}) {
  const [voted, setVoted] = useState(false);
  const { bg, fg } = getAvatarColors(review.id);
  const emoji =
    review.rating >= 4
      ? "\u{1F60A}"
      : review.rating === 3
        ? "\u{1F610}"
        : "\u{1F615}";
  const emojiBg =
    review.rating >= 4
      ? "#edf5ea"
      : review.rating === 3
        ? "#fffbeb"
        : "#fef2f2";

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold"
          style={{ background: bg, color: fg }}
        >
          {review.initials}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-[var(--brand-text)]">
              {review.name}
            </span>
            {review.verified && (
              <span className="rounded-full bg-[var(--brand-sage)] px-2 py-0.5 text-[11px] font-semibold text-[var(--brand-teal)]">
                &#10003; Verified
              </span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <Stars count={review.rating} size={13} />
            <span className="text-xs text-[var(--brand-muted)]">
              {review.date}
            </span>
          </div>
        </div>
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base"
          style={{ background: emojiBg }}
        >
          {emoji}
        </div>
      </div>

      <h3 className="mb-2 text-sm font-bold leading-snug text-[var(--brand-text)]">
        {review.title}
      </h3>
      <p className="text-sm leading-relaxed text-[var(--brand-muted)]">
        {review.body}
      </p>

      {/* Thumbnails */}
      {review.hasImages && (
        <div className="mt-3 flex gap-2">
          {MOCK_IMAGES.map((img, i) => (
            <button
              key={i}
              onClick={() =>
                onZoom({ images: MOCK_IMAGES, index: i, reviewer: review.name })
              }
              aria-label={`View photo ${i + 1} by ${review.name}`}
              className="flex h-16 w-16 cursor-zoom-in items-center justify-center rounded-[10px] border border-[#b2d8d4] transition-transform hover:scale-105 hover:shadow-md"
              style={{ background: img.bg }}
            >
              <ImageIcon size={20} color={img.stroke} />
            </button>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-3">
        <span className="text-xs text-gray-400">Was this helpful?</span>
        <button
          onClick={() => {
            if (!voted) setVoted(true);
          }}
          disabled={voted}
          className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold transition-all ${
            voted
              ? "border-[#b2d8d4] bg-[var(--brand-sage)] text-[var(--brand-teal)]"
              : "border-gray-200 bg-transparent text-gray-500 hover:border-[var(--brand-teal)] hover:text-[var(--brand-teal)]"
          }`}
        >
          <ThumbsUp size={13} fill={voted ? "#2a7a6f" : "none"} />
          {review.helpful + (voted ? 1 : 0)}
        </button>
      </div>
    </article>
  );
}

export function ReviewSection() {
  const shouldReduceMotion = useReducedMotion();
  const [sort, setSort] = useState<SortOption>("recent");
  const [filter, setFilter] = useState<FilterOption>("all");
  const [showAll, setShowAll] = useState(false);
  const [zoom, setZoom] = useState<{
    images: MockImage[];
    index: number;
    reviewer: string;
  } | null>(null);

  const sorted = [...REVIEWS]
    .sort((a, b) =>
      sort === "highest"
        ? b.rating - a.rating
        : sort === "lowest"
          ? a.rating - b.rating
          : sort === "helpful"
            ? b.helpful - a.helpful
            : b.id - a.id,
    )
    .filter((r) => filter === "all" || String(r.rating) === filter);

  const visible = showAll ? sorted : sorted.slice(0, 3);

  return (
    <section className="bg-[var(--brand-cream)] py-20 md:py-24">
      <div className="mx-auto max-w-2xl px-4 md:px-6">
        {/* Section heading */}
        <motion.div
          className="mb-8 text-center"
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-teal-hover)]">
            Customer Reviews
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-[var(--brand-text)] md:text-5xl">
            What People Say
          </h2>
        </motion.div>

        {/* Summary card */}
        <motion.section
          className="mb-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          variants={shouldReduceMotion ? undefined : fadeUpVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex flex-wrap items-start gap-6">
            <div className="min-w-[90px] text-center">
              <div className="text-5xl font-black leading-none text-[var(--brand-text)]">
                4.7
              </div>
              <Stars count={5} size={16} />
              <div className="mt-1 text-xs text-[var(--brand-muted)]">
                312 reviews
              </div>
            </div>
            <div className="min-w-[180px] flex-1">
              {([5, 4, 3, 2, 1] as const).map((star) => (
                <button
                  key={star}
                  onClick={() =>
                    setFilter((f) =>
                      f === String(star)
                        ? "all"
                        : (String(star) as FilterOption),
                    )
                  }
                  className="flex w-full cursor-pointer items-center gap-2 rounded-md border-0 bg-transparent px-1.5 py-0.5"
                >
                  <span className="min-w-[8px] text-xs text-[var(--brand-muted)]">
                    {star}
                  </span>
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 20 20"
                    fill="#f0bf60"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <div className="h-[7px] flex-1 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${RATING_DISTRIBUTION[star]}%`,
                        background:
                          filter === String(star) ? "#2a7a6f" : "#b2d8d4",
                      }}
                    />
                  </div>
                  <span className="min-w-[28px] text-right text-xs text-[var(--brand-muted)]">
                    {RATING_DISTRIBUTION[star]}%
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Highlight tags */}
          <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-200 pt-3.5">
            {HIGHLIGHT_TAGS.map(([label, pct]) => (
              <div
                key={label}
                className="flex items-center gap-1 rounded-full bg-[var(--brand-sage)] px-3 py-1 text-xs"
              >
                <span className="font-semibold text-[var(--brand-teal)]">
                  {label}
                </span>
                <span className="font-bold text-[var(--brand-teal-hover)]">
                  {pct}%
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Controls */}
        <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            {FILTER_OPTIONS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as FilterOption)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                  filter === f
                    ? "border-[var(--brand-teal)] bg-[var(--brand-sage)] text-[var(--brand-teal)]"
                    : "border-gray-200 bg-white text-[var(--brand-muted)] hover:border-gray-300"
                }`}
              >
                {f === "all" ? "All" : `${f} \u2605`}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {SORT_OPTIONS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSort(key as SortOption)}
                className={`rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors ${
                  sort === key
                    ? "border-[var(--brand-teal)] bg-[var(--brand-teal)] text-white"
                    : "border-gray-200 bg-white text-[var(--brand-muted)] hover:border-gray-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <p className="mb-3 text-xs text-[var(--brand-muted)]">
          {filter === "all"
            ? `Showing all ${sorted.length} reviews`
            : `Showing ${sorted.length} of ${REVIEWS.length} reviews`}
        </p>

        {/* Review list */}
        <div className="flex flex-col gap-3">
          {visible.length > 0 ? (
            visible.map((review) => (
              <ReviewCard key={review.id} review={review} onZoom={setZoom} />
            ))
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-[var(--brand-muted)]">
              No reviews match this filter.
            </div>
          )}
        </div>

        {/* Show all toggle */}
        {sorted.length > 3 && (
          <button
            onClick={() => setShowAll((s) => !s)}
            className="mt-3 w-full rounded-xl border-2 border-[#b2d8d4] bg-white py-3 text-sm font-semibold text-[var(--brand-teal)] transition-colors hover:bg-[var(--brand-sage)]"
          >
            {showAll ? "Show less" : `Show all ${sorted.length} reviews`}
          </button>
        )}

        {/* Zoom modal */}
        {zoom && (
          <ZoomModal
            images={zoom.images}
            initialIndex={zoom.index}
            reviewer={zoom.reviewer}
            onClose={() => setZoom(null)}
          />
        )}
      </div>
    </section>
  );
}
