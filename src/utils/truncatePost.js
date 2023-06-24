const truncatePost = (post) => {
  if (post.lenth <= 100) {
    return post;
  } else {
    return post.substring(0, 100) + "...";
  }
};

export default truncatePost;
