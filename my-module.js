/**
 * Merges time ranges that are overlapping, contiguous, or separated by a gap
 * less than or equal to the specified threshold.
 *
 * @param {Array<[number, number]>} ranges - Array of time ranges [start, end].
 * @param {number} threshold - The maximum permissible gap (in milliseconds) for merging.
 * @returns {Array<[number, number]>} - Array of non-overlapping, sorted merged ranges.
 */
const mergeTimeRanges = (ranges, threshold) => {
    if (!ranges || ranges.length === 0) {
        return [];
    }

    // Sort the ranges based on the starting time.
    const sortedRanges = [...ranges].sort((a, b) => a[0] - b[0]);

    const mergedResult = [];
    let currentStart = sortedRanges[0][0];
    let currentEnd = sortedRanges[0][1];

    for (let i = 1; i < sortedRanges.length; i++) {
        const [nextStart, nextEnd] = sortedRanges[i];

        // Merge condition: check for overlap, touching, or small gap (<= threshold).
        if (nextStart <= currentEnd + threshold) {
            // Merge: Update the end time to the maximum.
            currentEnd = Math.max(currentEnd, nextEnd);
        } else {
            // No merge: Finalize the current merged range and start a new one.
            mergedResult.push([currentStart, currentEnd]);
            currentStart = nextStart;
            currentEnd = nextEnd;
        }
    }

    // Add the very last merged interval.
    mergedResult.push([currentStart, currentEnd]);

    return mergedResult;
};

// Node.js Module Export Signature
module.exports = {
    mergeTimeRanges
};
