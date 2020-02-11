


#Iniciando back-end do GoBarber

##Ambiente e conceitos

docker run --name postgres -e POSTGRES_PASSWORD=123456789 -p 5432:5432 -d postgres

##Cadastro e Autenticação de Usuários

###Migration de usuário

npm sequelize migration:create --name=create-users

sequelize db:migrate

sequelize db:migrate:undo

https://www.md5online.org/md5-encrypt.html