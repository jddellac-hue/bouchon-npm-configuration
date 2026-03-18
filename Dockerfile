FROM scratch
# Remplace le registre npm PE interne
# Le contenu est copie dans le builder Angular via COPY --from=configNpm / /
COPY pe-commons-authent/ /home/node/app/node_modules/@pe-commons/authent/
