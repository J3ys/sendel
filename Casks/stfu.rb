cask "stfu" do
  version "2026.04.07"
  sha256 "f3636de1bebb63e5d7558b3ec0b79f7531039659983806c87399ce620bfe57fa"

  url "https://github.com/J3ys/sendel/releases/download/v#{version}/STFU.dmg"
  name "STFU"
  desc "STFU macOS application"
  homepage "https://sendel.org"

  app "STFU.app"
end
