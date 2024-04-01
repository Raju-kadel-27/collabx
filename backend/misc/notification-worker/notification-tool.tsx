const posts = [
    { postId: '1', userId: 'user123', content: 'This is a post.' },
    { postId: '2', userId: 'user456', content: 'Another post here.' },
    // ... more posts
  ];
  
  // Get unique user IDs from posts
  const uniqueUserIds = Array.from(new Set(posts.map((post) => post.userId)));
  

  const uniqeUser= [
    ...posts,
    {
        postId:'4',
        userId:'user4567',
        content:'CI CD errors'
    }
  ]

  posts.forEach((post)=>{
    console.log('logging the posts here');
    console.log({post});
  })