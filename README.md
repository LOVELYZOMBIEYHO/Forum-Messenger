# Next.js with Instant message Example

## Notes

1. NextJS 13
2. Tailwind CSS
3. Typescript
4. Redis with Upstash (company)
5. SWR(Stale-While-Revalidate)- for instant update in client side (https://swr.vercel.app/)
6. Pusher - for others see you message update (https://pusher.com/)
7. Flowbite - Tailwind css component https://flowbite.com/
8. NextJS AUTH - with experimental function ServerSide Session (unstable_getServerSession) -OAUTH2
9. TimeAgo - show time minutes/hours ago

Important Steps:

1. Upstash and Vercel integration (https://vercel.com/integrations/upstash) -otherwise, vercel can't get Upstash data when deployed (Doc:https://docs.upstash.com/redis/howto/vercelintegration)

Notice

1. Google OAUTH is easier to set than Facebook

## Experimental Function with unstable_getServerSession, NextJS App DIR, it maybe changed and please check the update documents.

## Demo: https://forum-messenger.vercel.app
