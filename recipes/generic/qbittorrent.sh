find -iname '**qBittorrent.desktop' | xargs -i -t arch_armv7 pelfCreator -m "xplshn" -n "org.qbittorrent.qBittorrent" -p "qbittorrent" -x "/usr/bin/qbittorrent" -e {} --dontpack
