# AUTHENT_MODE : mock (fake guard return true) | entreprise (vraie lib, defaut)
ARG AUTHENT_MODE=entreprise

FROM scratch AS mock
COPY pe-commons-authent-mock/ /home/node/app/node_modules/@pe-commons/authent/

FROM scratch AS entreprise
COPY pe-commons-authent/ /home/node/app/node_modules/@pe-commons/authent/

FROM ${AUTHENT_MODE}
