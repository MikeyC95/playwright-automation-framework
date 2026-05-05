import { test, expect } from '@playwright/test';

test('GET /posts returns a list of posts', async ({ request }) => {
  const response = await request.get('/posts');
  expect(response.status()).toBe(200);
  const posts = await response.json();
  expect(Array.isArray(posts)).toBe(true);
  expect(posts.length).toBeGreaterThan(0);
});

test('GET /posts/1 returns a single post', async ({ request }) => {
  const response = await request.get('/posts/1');
  expect(response.status()).toBe(200);
  const post = await response.json();
  expect(post).toMatchObject({
    id: 1,
    title: expect.any(String),
    body: expect.any(String),
    userId: expect.any(Number),
  });
});
