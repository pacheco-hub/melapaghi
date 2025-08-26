<?php
namespace App\Http\Controllers;

use App\Models\Segnalazione;
use App\Models\SegnalazioneFile;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;






class SegnalazioniController extends Controller
{
    public function store(Request $req)
    {
        $data = $req->validate([
            // inquilino
            'cf' => ['required','string','size:16','regex:/^[A-Z0-9]+$/i'],
            'nome' => ['nullable','string','max:100'],
            'cognome' => ['nullable','string','max:100'],
            'citta' => ['nullable','string','max:150'],
            'periodo' => ['nullable','string','max:100'],
            'tipo_contratto' => ['nullable','string','max:100'],
            'motivo' => ['required', Rule::in(['morosita','sfratto','danni','altro'])],
            'motivo_altro' => ['nullable','string'],
            'importo' => ['nullable','numeric','min:0','max:10000000'], // in euro

            // segnalante
            'cf_segnalante' => ['nullable','string','max:16'],
            'nome_segnalante' => ['nullable','string','max:100'],
            'cognome_segnalante' => ['nullable','string','max:100'],
            'email_segnalante' => ['nullable','email','max:150'],
            'tel_segnalante' => ['nullable','string','max:20'],
            'iban_segnalante' => ['nullable','string','max:34'],

            // altri
            'dichiaro' => ['required', Rule::in(['1'])],

            // file
            'allegati.*' => ['file','max:8192'], // 8MB per file
        ]);

        // salva segnalazione
        $segn = Segnalazione::create([
            'cf_inquilino'      => strtoupper($data['cf']),
            'nome_inquilino'    => $data['nome'] ?? null,
            'cognome_inquilino' => $data['cognome'] ?? null,
            'citta_prov'        => $data['citta'] ?? null,
            'periodo_locazione' => $data['periodo'] ?? null,
            'tipo_contratto'    => $data['tipo_contratto'] ?? null,
            'motivo'            => $data['motivo'],
            'motivo_altro'      => $data['motivo_altro'] ?? null,
            'importo_cents'     => isset($data['importo']) ? (int) round($data['importo'] * 100) : 0,

            'cf_segnalante'     => $data['cf_segnalante'] ?? null,
            'nome_segnalante'   => $data['nome_segnalante'] ?? null,
            'cognome_segnalante'=> $data['cognome_segnalante'] ?? null,
            'email_segnalante'  => $data['email_segnalante'] ?? null,
            'tel_segnalante'    => $data['tel_segnalante'] ?? null,
            'iban_segnalante'   => $data['iban_segnalante'] ?? null,
            'dichiaro'          => true,
        ]);

        // salva file
        if ($req->hasFile('allegati')) {
            foreach ($req->file('allegati') as $file) {
                $path = $file->store('segnalazioni/'. $segn->id, 'public'); // storage/app/public/...
                SegnalazioneFile::create([
                    'segnalazione_id' => $segn->id,
                    'original_name'   => $file->getClientOriginalName(),
                    'path'            => $path,
                    'mime'            => $file->getClientMimeType(),
                    'size_bytes'      => $file->getSize(),
                ]);
            }
        }

        return response()->json(['ok' => true, 'id' => $segn->id]);
    }

    public function check(Request $req)
    {
        $data = $req->validate([
            'cf' => ['required','string','size:16','regex:/^[A-Z0-9]+$/i'],
        ]);

        $cf = strtoupper(trim($data['cf']));

        // Verifica se ci sono segnalazioni con quel CF
        $count = Segnalazione::where('cf_inquilino', $cf)->count();

        return response()->json([
            'found' => $count > 0,
            'count' => $count,
        ]);
    }
}
