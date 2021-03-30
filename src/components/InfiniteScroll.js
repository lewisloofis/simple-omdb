import * as React from 'react';

/**
 * Infinite scroll component
 *
 * This component helps create infinite loading experience.
 */
const InfiniteScroll = ({
  onLoadMore,
  hasMore = false,
  children,
}) => {
  // State that indicates user has scrolled until bottom of the list
  const [bottomVisible, setBottomVisible] = React.useState(false);

  /**
   * Bottom of list element reference, this will help us create infinite loading
   * experience
   */
  const bottomOfListEl = React.useRef(null);

  // Attach event listener to the element at the bottom of list to create infinite
  // loading experience
  React.useEffect(() => {
    if (bottomOfListEl.current) {
      // Instantiate new visibility observer, this will track if an element is visible
      const observer = new IntersectionObserver((changes) => {
        for (const change of changes) {
          if (typeof change.isVisible === 'undefined') {
            change.isVisible = true;
          }

          // This will check if our listener (IntersectionObserver) detect
          // the tracked object. If the tracked object intersect user's viewport
          // and is marked as visible (no custom opacity or being blocked / occluded),
          // we will mark user reach bottom of list, thus triggering load more movies
          // action
          if (change.isIntersecting && change.isVisible) {
            setBottomVisible(true);
          } else {
            setBottomVisible(false);
          }
        }
      }, {
        threshold: [0.9],
        trackVisibility: true,
        delay: 500
      });

      // Track if the bottom of list element is visible
      observer.observe(bottomOfListEl.current);
    }
  }, [bottomOfListEl]);

  /**
   * Trigger load more data if list is scrolled to bottom.
   */
  React.useEffect(() => {
    if (bottomVisible && !!onLoadMore) {
      onLoadMore();
    }
  }, [bottomVisible, onLoadMore]);

  return (
    <div>
      {children}

      {/* This is invisible HTML element which represent bottom of our list. */}
      {/* We will trigger load more to create Infinite Scrolling experience. */}
      {/* Only rendered if the list has more data, flagged by hasMore props. */}
      {!!hasMore && <div ref={bottomOfListEl}>It ends here</div>}
    </div>
  );
};

export default InfiniteScroll;
