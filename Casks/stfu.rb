cask "stfu" do
  version "1.0.0"
  sha256 "f37e97a40a50c086705cd9268c77d9e4e862a57e62b7f95aba877b3dcc0acbe3"

  url "https://github.com/J3ys/sendel/releases/download/v#{version}/STFU.dmg"
  name "STFU"
  desc "STFU macOS application"
  homepage "https://sendel.org"

  app "STFU.app"
end
