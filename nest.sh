echo "Starting service"
sudo systemctl start mongod
cd Downloads/projects/nest/sanskar/
code .
cd ..
cd school
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash
export NVM_DIR=~/.nvm 
. ~/.nvm/nvm.sh
. ~/.profile
. ~/.bashrc
npm i
npm run start:debug
exec bash
