


#Iniciando back-end do GoBarber

##Ambiente e conceitos

##Cadastro e Autenticação de Usuários

###Migration de usuário

npm sequelize migration:create --name=create-users

sequelize db:migrate

sequelize db:migrate:undo

