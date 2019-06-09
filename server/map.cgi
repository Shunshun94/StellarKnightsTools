#!/usr/bin/perl

use Image::Magick;
use CGI;
$cgi = CGI::new();

$place = $cgi->url_param('place');
@places = split(/,/, $place);
@xPos = (100, 280, 400, 260, 130, 20);
@yPos = (100, 100, 250, 400, 400, 250);

$filename = "garden.png";

my $image = Image::Magick->new;
$image->Read("$filename");

for ($count = 0; $count < 6; $count++) {
	$image->Annotate(
		text=>@places[$count],
		x=>@xPos[$count],y=>@yPos[$count],
		fill=>"#000000",
		strokewidth=>3,
		antialias=>true,
		font=>"font.ttf",
		pointsize=>40
	);
}

print ("Content-type: image/png\n\n");
binmode STDOUT;
$image->Write("png:-");





print "\n\n";
 
undef $image;
exit();