cd server
npx --package now@9 --call \
"now -e NODE_ENV=production --token $NOW_TOKEN --npm deploy --public && now alias --token=$NOW_TOKEN"
