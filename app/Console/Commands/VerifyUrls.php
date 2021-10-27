<?php

namespace App\Console\Commands;

use App\Constants\Url as ConstantsUrl;
use App\Models\Url;
use App\Repositories\UrlRepository;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class VerifyUrls extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'verify:urls';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Verify all users urls';

  /**
   * Create a new command instance.
   *
   * @return void
   */
  public function __construct()
  {
    parent::__construct();
  }

  /**
   * Execute the console command.
   *
   * @return int
   */
  public function handle()
  {
    $urlRepository = new UrlRepository(new Url());
    $urls = $urlRepository->getAll();

    foreach ($urls as $url) {
      $ch = curl_init($url[ConstantsUrl::URL]);
      curl_setopt($ch, CURLOPT_HEADER, true);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt($ch, CURLOPT_TIMEOUT, 10);
      $html = curl_exec($ch);
      $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
      curl_close($ch);


      if ($httpcode >= 200 && $httpcode <= 299) {
        $url[ConstantsUrl::HTML] = utf8_encode($html);
      } else {
        $url[ConstantsUrl::HTML] = null;
      }

      $url[ConstantsUrl::STATUS] = $httpcode === 0 ? null : $httpcode;
      $url[ConstantsUrl::PROCESSED_AT] = Carbon::now()->format('Y-m-d H:i:s');
      $url[ConstantsUrl::IS_PROCESSED] = true;
      $url->save();
    }
    return Command::SUCCESS;
  }
}
