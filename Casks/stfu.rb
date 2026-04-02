cask "stfu" do
  version "2026.04.02"
  sha256 "947ba03900a29d293741d99dac7422774651284625beb2e40a14e0a62601b60a"

  url "https://github.com/J3ys/sendel/releases/download/v#{version}/STFU.dmg"
  name "STFU"
  desc "STFU macOS application"
  homepage "https://sendel.org"

  app "STFU.app"
end
