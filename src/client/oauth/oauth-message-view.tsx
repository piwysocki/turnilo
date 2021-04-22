/*
 * Copyright 2017-2021 Allegro.pl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import { Oauth } from "../../common/models/oauth/oauth";
import { MessagePanel, MessagePanelAction } from "../components/message-panel/message-panel";
import { login } from "./oauth";

interface OauthMessageViewProps {
  oauth: Oauth;
}

export const OauthMessageView: React.SFC<OauthMessageViewProps> = ({ oauth }) => {
  return <MessagePanel
    title="You are not logged in">
    <MessagePanelAction action={() => login(oauth)} label={"Login"} />
  </MessagePanel> ;
};