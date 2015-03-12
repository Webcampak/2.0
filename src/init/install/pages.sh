#!/bin/bash
# Copyright 2010-2012 Infracom & Eurotechnia (support@webcampak.com)
# This file is part of the Webcampak project.
# Webcampak is free software: you can redistribute it and/or modify it 
# under the terms of the GNU General Public License as published by 
# the Free Software Foundation, either version 3 of the License, 
# or (at your option) any later version.

# Webcampak is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
# without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
# See the GNU General Public License for more details.

# You should have received a copy of the GNU General Public License along with Webcampak. 
# If not, see http://www.gnu.org/licenses/

# List of webcampak pages used for permissions

INSERT INTO `pages` VALUES ('', 'auth.base.sources');
INSERT INTO `pages` VALUES ('', 'auth.base.sources');
INSERT INTO `pages` VALUES ('', 'auth.base.lang');

INSERT INTO `pages` VALUES ('', 'auth.stats');
INSERT INTO `pages` VALUES ('', 'auth.stats.system');
INSERT INTO `pages` VALUES ('', 'auth.stats.sources.disk');
INSERT INTO `pages` VALUES ('', 'auth.stats.pictures.files');
INSERT INTO `pages` VALUES ('', 'auth.stats.pictures.size');

INSERT INTO `pages` VALUES ('', 'auth.view.pictures');
INSERT INTO `pages` VALUES ('', 'auth.view.pictures.email');
INSERT INTO `pages` VALUES ('', 'auth.view.pictures.comment');

INSERT INTO `pages` VALUES ('', 'auth.view.videos');

INSERT INTO `pages` VALUES ('', 'auth.config');
INSERT INTO `pages` VALUES ('', 'auth.config.logs');
INSERT INTO `pages` VALUES ('', 'auth.config.cloud');
INSERT INTO `pages` VALUES ('', 'auth.config.cloud.read');
INSERT INTO `pages` VALUES ('', 'auth.config.cloud.write');
INSERT INTO `pages` VALUES ('', 'auth.config.instantcapture');

INSERT INTO `pages` VALUES ('', 'auth.config.sources');
INSERT INTO `pages` VALUES ('', 'auth.config.sources.read');
INSERT INTO `pages` VALUES ('', 'auth.config.sources.write');

INSERT INTO `pages` VALUES ('', 'auth.config.admin.cloud');
INSERT INTO `pages` VALUES ('', 'auth.config.admin.general');
INSERT INTO `pages` VALUES ('', 'auth.config.admin.permissions');
INSERT INTO `pages` VALUES ('', 'auth.config.admin.reboot');
INSERT INTO `pages` VALUES ('', 'auth.config.admin.connecteddevices');
