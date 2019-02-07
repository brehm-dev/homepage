FROM phusion/passenger-nodejs:1.0.0

LABEL maintainer="Andreas Brehm <andreas@brehm.me>"

ENV HOME /root

CMD ["/sbin/my_init"]

RUN /pd_build/nodejs.sh

RUN rm -f /etc/service/nginx/down

COPY --chown=app:app /local/path/of/your/app /home/app/webapp

RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*