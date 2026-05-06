import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { PageGutter } from "@/components/Layout/PageGutter";
import type { Belonging } from "@/lib/profile";
import type { TimelineLane, TimelineLaneBar } from "@/lib/timeline";
import { createTimelineModel, getTimelinePercent } from "@/lib/timeline";
import styles from "./BelongingTimeline.module.css";

type BelongingTimelineProps = {
	items: Belonging[];
};

type TimelineBarButtonProps = {
	bar: TimelineLaneBar;
	lane: TimelineLane;
	isActive: boolean;
	onToggle: () => void;
};

const getPercentStyle = (percent: number) =>
	({ left: `${percent}%` }) as CSSProperties;

const getBarClassName = (bar: TimelineLaneBar) =>
	`${styles.bar} ${bar.ongoing ? styles.ongoing : ""}`;

const getPopoverClassName = (lane: TimelineLane) =>
	`${styles.popover} ${lane.key === "community" ? styles.popoverUp : ""}`;

const getBarStyle = (bar: TimelineLaneBar, lane: TimelineLane) =>
	({
		left: `${bar.left}%`,
		width: `${bar.width}%`,
		"--lane-color": lane.color,
		"--bar-row": bar.row,
	}) as CSSProperties;

function TimelineBarButton({
	bar,
	lane,
	isActive,
	onToggle,
}: TimelineBarButtonProps) {
	return (
		<button
			className={getBarClassName(bar)}
			type="button"
			aria-pressed={isActive}
			onClick={onToggle}
			style={getBarStyle(bar, lane)}
		>
			<span className={styles.barName}>{bar.name}</span>
			<span className={styles.period}>{bar.period}</span>
			{isActive ? (
				<div className={getPopoverClassName(lane)}>
					<div className={styles.popoverTitle}>
						<strong>{bar.name}</strong>
						<span>{bar.period}</span>
					</div>
					<p>{bar.note}</p>
				</div>
			) : null}
		</button>
	);
}

export function BelongingTimeline({ items }: BelongingTimelineProps) {
	const scrollerRef = useRef<HTMLDivElement>(null);
	const [activeIndex, setActiveIndex] = useState<number | null>(() => {
		const ongoing = items.findIndex((item) => !item.until);
		return ongoing >= 0 ? ongoing : items.length - 1;
	});

	const { lanes, years, nowX, endYear, startYear } = useMemo(
		() => createTimelineModel(items),
		[items],
	);

	useEffect(() => {
		const scroller = scrollerRef.current;
		const timeline = scroller?.firstElementChild;
		if (!(timeline instanceof HTMLElement) || !scroller) return;

		const nowLeft = (timeline.scrollWidth * nowX) / 100;
		const targetLeft = nowLeft - scroller.clientWidth * 0.7;
		const maxLeft = timeline.scrollWidth - scroller.clientWidth;
		scroller.scrollLeft = Math.max(0, Math.min(targetLeft, maxLeft));
	}, [nowX]);

	return (
		<section className={styles.section} id="belonging">
			<PageGutter className={styles.header}>
				<div>
					<div className={styles.titleRow}>
						<span className={styles.number}>02</span>
						<h2 className={styles.title}>Belonging</h2>
					</div>
					<div className={styles.caption}>経歴</div>
				</div>
				<div className={styles.legend}>
					{lanes.map((lane) => (
						<span className={styles.legendItem} key={lane.key}>
							<span
								className={styles.swatch}
								style={{ background: lane.color }}
							/>
							{lane.label}
						</span>
					))}
				</div>
			</PageGutter>

			<PageGutter className={styles.scroller} ref={scrollerRef}>
				<div className={styles.timeline}>
					<div className={styles.years}>
						{years.map((year) => (
							<span
								className={styles.year}
								key={year}
								style={getPercentStyle(
									getTimelinePercent(year, startYear, endYear),
								)}
							>
								{year}
							</span>
						))}
						<span className={styles.nowLabel} style={getPercentStyle(nowX)}>
							NOW ▼
						</span>
					</div>
					<div className={styles.body}>
						{years.map((year) => (
							<span
								className={styles.gridLine}
								key={year}
								style={getPercentStyle(
									getTimelinePercent(year, startYear, endYear),
								)}
							/>
						))}
						<span className={styles.nowLine} style={getPercentStyle(nowX)} />
						{lanes.map((lane) => (
							<div className={styles.lane} key={lane.key}>
								<div className={styles.laneLabel}>{lane.label}</div>
								<div
									className={styles.laneBars}
									style={{ "--lane-rows": lane.rows } as CSSProperties}
								>
									{lane.bars.map((bar) => (
										<TimelineBarButton
											bar={bar}
											isActive={activeIndex === bar.index}
											key={bar.index}
											lane={lane}
											onToggle={() =>
												setActiveIndex(
													activeIndex === bar.index ? null : bar.index,
												)
											}
										/>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</PageGutter>
			<PageGutter className={styles.hint}>
				<span>
					{items.length} entries · {startYear} → now
				</span>
				<span>← scroll · click bar for details →</span>
			</PageGutter>
		</section>
	);
}
