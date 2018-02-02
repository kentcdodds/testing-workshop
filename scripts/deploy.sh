npm i -g now@9
now -e NODE_ENV=production --token $NOW_TOKEN --npm deploy --public
now alias --token=$NOW_TOKEN
