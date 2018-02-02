# Because we deploy from the server directory
# the shared directory needs to be inside the shared directory
# So we'll make a symlink inside the server/other directory
# that points to the shared directory, and install that.
mkdir -p $PWD/server/other
ln -s $PWD/shared $PWD/server/other/

cd server
npm install -S ./other/shared
npx --package now@9 --call "now -e NODE_ENV=production --token $NOW_TOKEN --npm deploy --public && now alias --token=$NOW_TOKEN"

# restore things (in case someone runs this locally by mistake)
rm -rf server/other/shared
npm install -S ../shared
