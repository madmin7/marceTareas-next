// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";

interface Data {
  ok: boolean;
  name: string;
  metodo: string;
}


export default function handler(req: NextApiRequest, res:NextApiResponse <Data>) {

  res.status(200).json({
    ok: true,
    name: 'John Doe',
    metodo: req.method || 'no hay metodo'

  })
}
