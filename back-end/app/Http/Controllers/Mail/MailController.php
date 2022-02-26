<?php

namespace App\Http\Controllers\Mail;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function sendMail(Request $req)
        {
            $email_tujuan = "simrs.rsudmataram@gmail.com";
            $from = "irham.pnm@gmail.com";


            $data = [
                'nama'=>' RSUD KOTA MATARAM',
                'body_mail' => ' tess ajja'
            ];

            Mail::send('Mail/BodyEmail', $data, function($mail) use ($email_tujuan){
                $mail->to($email_tujuan, 'no-refly')->subject("Tess email");
                $mail->from("irham.pnm@gmail.com", 'Testing');
            });

            if(Mail::failures()){
                return "Gagall ";
            }

            return "Berhasill";


        }
}
