npm i -g now
cd server
now --token $NOW_TOKEN --npm deploy --public
now alias --token=$NOW_TOKEN
