/*
 * Copyright 2017-2022 Allegro.pl
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
import { Request } from "express";
import { Expression } from "plywood";
import { isNil } from "../../../common/utils/general/general";
import { InvalidRequestError } from "../request-errors/request-errors";

export function parseExpression(req: Request): Expression {
  const expression = req.body.expression;
  if (isNil(expression)) {
    throw new InvalidRequestError("Parameter expression is required");
  }
  try {
    return Expression.fromJS(expression);
  } catch (e) {
    throw new InvalidRequestError(`Bad expression: ${e.message}`);
  }
}
